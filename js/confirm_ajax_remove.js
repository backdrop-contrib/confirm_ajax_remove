var carbypass = false;
var carPendingButton = null;

Backdrop.behaviors.carStartupCode = {
  attach: function (context) {
    
    document.addEventListener('mousedown', carConfirmRemove, true);
    
    var car_dialog_title = Backdrop.settings.car_dialog_title;
    var car_dialog_text = Backdrop.settings.car_dialog_text;
    var car_dialog_cancel_text = Backdrop.settings.car_dialog_cancel_text;
    var car_dialog_remove_text = Backdrop.settings.car_dialog_remove_text;
    
    // Add a modal dialog box to the page
    jQuery('body').append(`
      <div id="car-remove-confirm-modal" style="display:none;">
        <div class="car-rcm-overlay"></div>
        <div class="car-rcm-dialog">
          <h3>${car_dialog_title}</h3>
          <p>${car_dialog_text}</p>
          <div class="car-rcm-buttons">
            <button class="car-rcm-cancel">${car_dialog_cancel_text}</button>
            <button class="car-rcm-confirm">${car_dialog_remove_text}</button>
          </div>
        </div>
      </div>
    `);    
    
 
    // Handle confirm and cancel buttons on our dialog
    
    // Cancel
    jQuery(document).on('click', '.car-rcm-cancel, .car-rcm-overlay', function () {
      carPendingButton = null;
      jQuery('#car-remove-confirm-modal').fadeOut(150);
    });

    // Confirm
    jQuery(document).on('click', '.car-rcm-confirm', function () {
      if (!carPendingButton) return;
      carbypass = true;
      $('#car-remove-confirm-modal').fadeOut(150);
      carPendingButton.dispatchEvent(new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window
      }));
      carbypass = false;
      carPendingButton = null;
    });    
       
}
};


function carConfirmRemove(e) {

  if (carbypass) return;
  
  const btn = e.target.closest('input.remove-button,input.multiple-fields-remove-button');
  if (!btn) return;
  
  e.preventDefault();
  e.stopImmediatePropagation();
  
  carPendingButton = btn;
  
  jQuery('#car-remove-confirm-modal').fadeIn(150);
    
    
}

