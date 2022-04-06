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
      headless: true,
      devtools: true,
    });

    try {
      const page = await browser.newPage();

      // ACESSANOD O SITE
      try{
        await page.goto(process.env.URL_SURA);
      }catch(err){
        throw new Error('Não foi possível acessar o site')
      }
      
      // FAZENDO LOGIN
      try{
        await page.type("input[name=inputLoginWeb]", data.cnpj);
        await page.type("input[name=inputSenhaWeb]", data.password);
        await page.$eval("form[name=logon]", (form) => form.submit());
      }catch(err){
        throw new Error('Não foi possível fazer o login')
      }

      const [target] = await Promise.all([
        new Promise((resolve) => browser.once("targetcreated", resolve)),
      ]);

      const newPage = await target.page();
      await newPage.bringToFront();

      
      await delay(3000);

      // ABRINDO MODAL DE INCLUSÃO DE EMBARQUE
      try{
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
      }catch(err){
        throw new Error('Não foi possível fazer o login')
      }


      await delay(3000);

      // PREENCHENDO D FILTRO DE DATA DE INCLUSÃO DE EMBARQUE
      try{
        await newPage.evaluate(() => {
          const date = new Date();
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
        });
      }catch(err){
        throw new Error('Não foi possível preencher o filtro do modal de embarque')
      }


      await delay(3000);

      // CONFIMAR OPÇÕES DE APÓLICES
      try{
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
      }catch(err){
        throw new Error('Não foi possível confirmar apólices')
      }


      await delay(3000);

      // PREENCHENDO FOMULÁRIO DE EMBARQUE
      try{
        await newPage.evaluate(() => {
          const anchors = {
            cte: "CTE",
            mdfe: "MDF-E",
            nfe: "Outros",
          };
          const date = new Date(data.boarding_date);
          const day = date.getDay();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const date_formated = `${day}/${month}/${year}`;
  
          const frameMeio = document.querySelector('frame[name="meio"]');
          const frameDescricao =
            frameMeio.contentWindow.document.body.querySelector(
              "iframe[name=descricao]"
            );
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=Documento0]"
          ).value = data.document_number;
  
          frameDescricao.contentWindow.document.body.querySelector(
            "select[name=Modelo0]"
          ).value = anchors[data.document_type];
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=DataEmb0]"
          ).value = date_formated;
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=UfOrig0]"
          ).value = data.origin_uf;
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=UfDest0]"
          ).value = data.destination_uf;
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=UrbanoSN0]"
          ).checked = data.is_urban;
  
          frameDescricao.contentWindow.document.body.querySelector(
            "input[name=ValorMercad0]"
          ).value = data.charge_value;
  
          const submitButton =
            frameDescricao.contentWindow.document.body.querySelector(
              "input[name=salvar]"
            );
  
          submitButton.click();
        });
      }catch(err){
        throw new Error('Não foi possível preencher o formulário de embarque')
      }


      await delay(3000);

      // ENVIANDO O FORMULÁRIO
      try{
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
        });
      }catch(err){
        throw new Error('Não foi possível enviar o formulário de embarque')
      }
      await browser.close();
      return 

    } catch (err) {
      await browser.close();
      throw err
    }
  },
};
