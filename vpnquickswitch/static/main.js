"use strict";

var currentStatus;

/**
 * Submit VPN Form, show alrts
 * @return {void}
 */
function vpnForm() {
    $('#vpn-change-button').on('click', function(e) {
        var filechange = $('#vpn-selection').val();

        if (filechange == '') {
            return;
        }

        var previousIp = currentStatus.ip;

        // Alerts
        var vpnFormAlert = function(type) {
            switch (type) {
                case 'attempting':
                    showAlert('info', '<p>Attempting to load <b>' + filechange + '</b>&hellip;</p><div class="progress" style="margin:10px 0 0"> <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"> </div> </div>', true);
                    break;
                case 'success':
                    showAlert('success', '<p>Openvpn configuration <b>' + filechange + '</b> loaded</p>', true);
                    break;
                case 'error':
                    showAlert('danger', '<p>Error changing configuration to <b>' + filechange + '</b></p>', true);
                    break;
            }
        }

        // AJAX Request
        $.ajax({
            type: "POST",
            url: "/change",
            data: { selection: filechange },
            complete: function(xhr) {
                
                if (xhr.status == '200') {
                    vpnFormAlert('attempting');

                    // Set up interval timeout/iterations, and max tries
                    var intervalTimeout = 5000;
                    var iteration = 0;
                    var maxInterval = intervalTimeout * 12;

                    var interval = setInterval(function() {
                        // reset currentStatus
                        vpnStatus();

                        // If IP changed, then success!
                        if (previousIp != currentStatus.ip) {
                            vpnFormAlert('success');
                            clearInterval(interval);
                        // If max tries exceeded, then error and stop
                        } else if (iteration >= maxInterval) {
                            vpnFormAlert('error');
                            clearInterval(interval);
                        }
                        console.log(iteration)
                        console.log(maxInterval)

                        iteration += intervalTimeout;

                    }, intervalTimeout)

                } else {
                    vpnFormAlert('error');
                }
            }
        })

        e.preventDefault();
    });
}

/**
 * Keep attempting to check if VPN change has been successful
 * @return {void}
 */
function vpnStatus() {
    $.get("/status", function(json) {
        currentStatus = json;
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

    var html = '<div class="alert alert-' + alertType + ' alert-dismissible fade in" style="display:none" role="alert">\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                <span aria-hidden="true">×</span>\
            </button>\
            ' + body + '\
        </div>';

    alertsContainer.append(html).find('.alert').slideDown('fast');
}

/**
 * Loader
 */
$(function() {
    vpnStatus();
    vpnForm();
});