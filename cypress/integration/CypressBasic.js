describe ('simplecypresstest', function () {
it ('testcase', function () {
    cy.visit('https://www.google.lk/');
    cy.xpath('//input[@title="Search"]').type('Nipuna')
    cy.wait(3000)
    expect (true).to.equal(true);
})
})