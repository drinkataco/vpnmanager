"use strict";

function vpnForm() {
    $('#vpn-change-button').on('click', function(e) {
        var filechange = $('#vpn-selection').val();

        $.ajax({
            type: "POST",
            url: "/change",
            data: { selection: filechange },
            complete: function(xhr) {
                if (xhr.status == '200') {
                    showAlert('success', '<p>Successfully changed VPN configuration file to <b>' + filechange + '</b></p>', true);
                } else {
                    showAlert('danger', '<p>Error changing configuration to <b>' + filechange + '</b></p>', true);
                }
            }
        })

        e.preventDefault();
    });
}

/**
 * Show Alert on page
 * @param  {string} alertType   success/info/warning/danger
 * @param  {string} body        Body of message
 * @param  {boolean} clearOnAdd Clear all alerts for new?
 * @return {void}
 */
function showAlert(alertType, body, clearOnAdd) {
    var clearOnAdd = clearOnAdd || false;
    var alertsContainer = $('.vpn-alerts');

    if (clearOnAdd) {
        alertsContainer.empty();
    }

    alertsContainer.append('<div class="alert alert-' + alertType + ' alert-dismissible fade in" role="alert">\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                <span aria-hidden="true">×</span>\
            </button>\
            ' + body + '\
        </div>');
}

$(function() {
    vpnForm();
});