/// <reference types="cypress" />

describe("HTML Table Testing", () => {
    it('Loop through table rows', () => {
      let TableArray = new Array();
      cy.visit('https://www.w3schools.com/html/html_tables.asp')
      cy.xpath('//*[@id="customers"]//tr').each(($TableRowElement, TableRowIndex, $list) => {
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
      }).then(() => {
        // Looping TableArray
        console.log('Printing TableArray')
        for (let i = 1; i < TableArray.length; i++) {
          for (let a = 0; a < TableArray[i].length; a++) {
            console.log(`${TableArray[0][a]}: ${TableArray[i][a]}`)
          }
        }
      })
    });
  });
  
  
  
  