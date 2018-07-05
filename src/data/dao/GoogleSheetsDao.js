import GoogleSpreadsheet from 'google-spreadsheet';

export const getSheetData = async () => {
  var creds_json = {
    client_email: 'ra.vrma@gmail.com',
    private_key: 'AIzaSyBntRy1N3avfgMDHt6ptCXUjCa8Zit2fg0',
  };

  let doc = new GoogleSpreadsheet(
    '18ZWXfEeGEP8NV5g_flmEhBkXgsKEJT6y9iHt0XZ_2lE'
  );
  doc.useServiceAccountAuth(creds_json, () => {
    doc.getInfo(info => {
      let sheet = info.worksheets[0];
      console.log(sheet); //eslint-disable-line no-console

      sheet.getRows(rows => {
        console.log(rows); //eslint-disable-line no-console
      });
    });
  });
};
