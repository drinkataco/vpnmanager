import subprocess
from .settings import *

class Vpn(object):
    vpn_file = ''
    status   = ''
    process  = ''

    """
        OpenVPN management
    """
    def set_vpn_config(self, file):
        """
            Set VPN Configuration file to selected
        """
        try:
            path = "%s/%s.%s" % (settings.get_value('vpn_loc'), file, settings.get_value('vpn_ext'))
            self.process = subprocess.Popen(['sudo',
                                      settings.get_value('daemon'),
                                      '--config',
                                      path,
                                      '--auth-user-pass',
                                      settings.get_value('creds')])

            self.vpn_file = file
            return True;
        except Exception as e:
            return False

    def get_vpn_config(self):
        pass

    def get_current_status(self):
        # Fetch IP here
        return {"ip": "1.1.1.8"}

    def get_available_services(self):
        """
            Get all VPN files
        """
        services = []

        ext = settings.get_value('vpn_ext')
        vpnloc = settings.get_value('vpn_loc')

        trim_amount = len(ext) + 1

        for file in os.listdir(vpnloc):
            if file.endswith(ext):
                services.append(file[:-trim_amount])

        return services