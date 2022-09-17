describe('Basic Data Layer Checks', () => {
    it('has a dataLayer and loads GTM', () => {
      cy.visit('https://assets.staysure.co.uk/claims/')
      cy.xpath('//*[@id="startWizard" and normalize-space(text()) = "Submit your claim"]').click();
      cy.window().then((window) => {
        assert.isDefined(window.dataLayer, 
          'window.dataLayer is defined');
  
        assert.isDefined(
          window.dataLayer.find(x => x.event === "ga_virtualPageview"), 
          "GTM is loaded");

          window.dataLayer.forEach(dlObject=>{
            if (String(dlObject['event']).includes('ga_virtualPageview'))
            {
              console.log('event: ' + dlObject['event']);
              console.log('journey: ' + dlObject['ga_virtual']['journey']);
              console.log('step: ' + dlObject['ga_virtual']['step']);
            }

            
            // Object.keys(dlObject).forEach(key=>{
            //     console.log(key.toString())
            // })
            // Object.values(dlObject).forEach(key=>{
            //     console.log(key.toString())
            // })
          })
      })
    });
  });