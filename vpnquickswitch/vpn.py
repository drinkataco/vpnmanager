from .settings import *

class Vpn(object):
    """
        OpenVPN management
    """
    def set_vpn_config(self, file):
        """
            Set VPN Configuration file to selected
        """
        # TODO: openvpn <file>
        # TODO: Get creds and enter them
        print(file)
        return False;

    def get_vpn_config(self):
        pass

    def check_vpn_status(self):
        pass

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