const puppeteer = require("puppeteer");
const user = require("../config/user");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

module.exports = {
  webcrawler: async (data) => {
    const browser = await puppeteer.launch({
      headless: false,
      devtools: false,
    });

    try {
      const page = await browser.newPage();

      // ACESSANOD O SITE
      try {
        await page.goto(process.env.URL_SURA);
      } catch (err) {
        throw new Error("Não foi possível acessar o site");
      }

      // FAZENDO LOGIN
      try {
        await page.type("input[name=inputLoginWeb]", data.cnpj);
        await page.type("input[name=inputSenhaWeb]", data.password);
        await page.$eval("form[name=logon]", (form) => form.submit());
      } catch (err) {
        throw new Error("Não foi possível fazer o login");
      }

      const [target] = await Promise.all([
        new Promise((resolve) => browser.once("targetcreated", resolve)),
      ]);

      const newPage = await target.page();
      await newPage.bringToFront();

      await delay(3000);

      // ABRINDO MODAL DE INCLUSÃO DE EMBARQUE
      try {
        await newPage.evaluate(() => {
          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameMenuMain =
            frameMeio.contentWindow.document.body.querySelector(
              'iframe[name="menuMain"]'
            );
          const buttonInclusao =
            frameMenuMain.contentWindow.document.body.querySelector(
              "#M06 > a:nth-child(3)"
            );

          buttonInclusao.click();
        });
      } catch (err) {
        throw new Error("Não foi possível fazer o login");
      }

      await delay(3000);

      // PREENCHENDO D FILTRO DE DATA DE INCLUSÃO DE EMBARQUE
      try {
        await newPage.evaluate((data) => {
          const date = new Date(data.boarding_date);
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();

          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameDescricao =
            frameMeio.contentWindow.document.body.querySelector(
              'iframe[name="descricao"]'
            );

          const inputInclusao =
            frameDescricao.contentWindow.document.body.querySelector(
              'input[name="DtMov"]'
            );

          inputInclusao.value = `${month}/${year}`;

          const buttonInclusao =
            frameDescricao.contentWindow.document.body.querySelector(
              'input[name="salvar"]'
            );

          buttonInclusao.click();
        }, data);
      } catch (err) {
        throw new Error(
          "Não foi possível preencher o filtro do modal de embarque"
        );
      }

      await delay(3000);

      // CONFIMAR OPÇÕES DE APÓLICES
      try {
        await newPage.evaluate(() => {
          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameDescricao =
            frameMeio.contentWindow.document.body.querySelector(
              "iframe[name=descricao]"
            );
          const frameDetalhes =
            frameDescricao.contentWindow.document.body.querySelector(
              "iframe[id=detalhes]"
            );
          const submitButton =
            frameDetalhes.contentWindow.document.body.querySelector(
              "input[name=salvar]"
            );

          submitButton.click();
        });
      } catch (err) {
        throw new Error("Não foi possível confirmar apólices");
      }

      await delay(3000);

      // PREENCHENDO FOMULÁRIO DE EMBARQUE
      try {
        await newPage.evaluate((data) => {
          const anchors = {
            cte: "CTE",
            mdfe: "MDF-E",
            nfe: "Outros",
          };
          const date = new Date(data.boarding_date);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const date_formated = `${day}/${month}/${year}`;

          const runFocus = (frame, selector) => {
            if (
              frame.contentWindow.document.body.querySelector(selector).onblur
            ) {
              frame.contentWindow.document.body
                .querySelector(selector)
                .onblur();
              frame.contentWindow.document.body.querySelector(selector).blur();
            }
          };

          const setValue = (frame, selector, value) => {
            runFocus(frame, selector);
            frame.contentWindow.document.body.querySelector(selector).value =
              value;
            runFocus(frame, selector);
          };

          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameDescricao =
            frameMeio.contentWindow.document.body.querySelector(
              "iframe[name=descricao]"
            );

          setValue(
            frameDescricao,
            "input[name=Documento0]",
            data.document_number
          );

          setValue(
            frameDescricao,
            "select[name=Modelo0]",
            anchors[data.document_type]
          );

          setValue(frameDescricao, "input[name=DataEmb0]", date_formated);

          setValue(frameDescricao, "input[name=Veiculo0]", "ABC0000");

          setValue(frameDescricao, "input[name=UfOrig0]", data.origin_uf);

          setValue(frameDescricao, "input[name=UfDest0]", data.destination_uf);

          setValue(frameDescricao, "input[name=UrbanoSN0]", data.is_urban);

          setValue(
            frameDescricao,
            "input[name=ValorMercad0]",
            data.charge_value
          );
        }, data);
      } catch (err) {
        throw new Error("Não foi possível preencher o formulário de embarque");
      }

      await delay(3000);

      await newPage.on("dialog", async (dialog) => {
        await dialog.accept();
      });

      // ENVIANDO O FORMULÁRIO
      try {
        await newPage.evaluate(() => {
          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameDescricao =
            frameMeio.contentWindow.document.body.querySelector(
              "iframe[name=descricao]"
            );

          const submitButton =
            frameDescricao.contentWindow.document.body.querySelector(
              "input[name=salvar]"
            );

          submitButton.click();
          ok = true;
        });
      } catch (err) {
        throw new Error("Não foi possível enviar o formulário de embarque");
      }


      return;
    } catch (err) {
      await browser.close();
      throw err;
    }
  },
};
