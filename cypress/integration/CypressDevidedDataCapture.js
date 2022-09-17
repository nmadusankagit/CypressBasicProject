/// <reference types="cypress" />

let VerificationArea = Cypress.env('TableVerificationArea');

describe("HTML Table Testing", () => {
  it('Loop through table rows', () => {
    let TableArray = new Array();
    let TableRowReferenceArray = new Array();
    let VerificationTableRowChunkArray = new Array()
    let chunkSize;
    let SelectedChunkToRun = (VerificationArea.split('/')[0]) - 1

    cy.visit('https://www.w3schools.com/html/html_tables.asp')

    cy.xpath('//*[@id="customers"]//tr').its('length').then((TableRowCount) => {
      chunkSize = Math.round((TableRowCount - 1) / VerificationArea.split('/').pop());
      for (let i = 1; i < TableRowCount; i++) {
        TableRowReferenceArray.push(i);
      }
    }).then(() => {
      for (let i = 0; i < TableRowReferenceArray.length; i += chunkSize) {
        const VerificationTableRowChunk = TableRowReferenceArray.slice(i, i + chunkSize);
        VerificationTableRowChunk.unshift(0);
        VerificationTableRowChunkArray.push(VerificationTableRowChunk);
      }
    }).then(() => {
      console.log('Processing Row Section: ' + VerificationTableRowChunkArray[SelectedChunkToRun]);
      for (let y = 0; y < VerificationTableRowChunkArray[SelectedChunkToRun].length; y++) {
        cy.xpath('//*[@id="customers"]//tr').eq(VerificationTableRowChunkArray[SelectedChunkToRun][y]).then(($TableRowElement) => {
          if ($TableRowElement.find("th").length > 0) {
            let TableHeaderArray = new Array();
            cy.wrap($TableRowElement).xpath('.//th').each(($TableRowHeaderElement, TableRowHeaderIndex, $list) => {
              cy.wrap($TableRowHeaderElement).invoke('text').then((Header) => {
                TableHeaderArray.push(Header)
              })
            }).then(() => {
              TableArray.push(TableHeaderArray)
            })
          } else if ($TableRowElement.find("td").length > 0) {
            let TableDataArray = new Array();
            cy.wrap($TableRowElement).xpath('.//td').each(($TableRowDataElement, TableRowDataIndex, $list) => {
              cy.wrap($TableRowDataElement).invoke('text').then((Data) => {
                TableDataArray.push(Data)
              })
            }).then(() => {
              TableArray.push(TableDataArray)
            })
          }
        })

      }

    }).then(() => {
      // Looping TableArray
      console.log('Printing TableArray')

      for (let i = 1; i < TableArray.length; i++) {
        let Row = new Array();
        for (let a = 0; a < TableArray[i].length; a++) {
          Row.push(`${TableArray[0][a]}: ${TableArray[i][a]} / `)
          // console.log(`${TableArray[0][a]}: ${TableArray[i][a]}`)
        }
        console.log(...Row)
      }

    })
  });
});



