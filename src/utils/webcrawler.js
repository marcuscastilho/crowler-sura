const puppeteer = require("puppeteer");
const user = require("../config/user");

module.exports = {
  webcrawler: async () => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: false,
    });

    try {
      const page = await browser.newPage();
      await page.goto(process.env.URL_SURA);
      await page.type("input[name=inputLoginWeb]", user.id);
      await page.type("input[name=inputSenhaWeb]", user.password);
      await page.$eval("form[name=logon]", (form) => form.submit());

      const [target] = await Promise.all([
        new Promise((resolve) => browser.once("targetcreated", resolve)),
      ]);

      const newPage = await target.page();
      await newPage.bringToFront();
      await newPage.waitForNavigation();

      await newPage.goto(
        "https://externo.segurossura.com.br/servlet/rsagroup.integracao.IntegracaoServlet?contexto=prjtrp&destino=/servlet/prjtrp.servlet.averbacaoeletronica.ClsServletEscolheApolices?Pagina=Inicio&Modo=Inclusao"
      );
      await newPage.waitForNavigation();

      const data = new Date();
      const month = String(data.getMonth() + 1).padStart(2, "0");
      const year = data.getFullYear();

      // await newPage.type(
      //   "body > form > div:nth-child(8) > table.texto > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2) > input",
      //   `${month + year}`
      // );
      // await newPage.click(
      //   "body > form > div:nth-child(8) > table:nth-child(2) > tbody > tr > td > input"
      // );

      // await newPage.evaluate(() => {
      //   const iframe = document.querySelector("#detalhes");
      //   console.log(iframe);
      // });

      // const frameMeio = document.querySelector("frame[name=meio]");
      // const frameDescricao =
      //   frameMeio.contentWindow.document.body.querySelector(
      //     "iframe[name=descricao]"
      //   );
      // const frameDetalhes =
      //   frameDescricao.contentWindow.document.body.querySelector(
      //     "iframe[id=detalhes]"
      //   );
      // const submitButton =
      //   frameDetalhes.contentWindow.document.body.querySelector(
      //     "input[name=salvar]"
      //   );

      // await newPage.waitForSelector("body > form");

      // await newPage.evaluate(() => {
      //   console.log(document.querySelector('iframe[name=descricao]'))
      //   continua();
      // })
    } catch (err) {
      console.log(err);
      // await browser.close();
    }
  },
};
