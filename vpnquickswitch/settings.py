import os
import sys
import configparser

"""
    Load configuration from file, or set defaults
"""
# Defaults
conf_loc = "/Users/joshwalwyn/Desktop/openvpntest/vpnquickswitch"
vpn_loc = "/Users/joshwalwyn/Desktop/openvpntest/"
vpn_ext = "ovpn"
default_name = "default"
cred_loc = "/Users/joshwalwyn/Desktop/openvpntest/creds.txt"

"""
    Load/Make config file
"""
def load_config():
    # config = ConfigParser.ConfigParser()

    try:
        conf_loc = "/Users/joshwalwyn/Desktop/openvpntest/vpnquickswitch"

        config = configparser.ConfigParser()
        config.readfp(open(conf_loc))

        items = config.get('vpnquickswitch', 'cred_loc')

        vpn_loc = config.get('vpnquickswitch', 'vpn_loc')
        vpn_ext = config.get('vpnquickswitch', 'vpn_ext')
        default_name = config.get('vpnquickswitch', 'default_name')
        cred_loc = config.get('vpnquickswitch', 'cred_loc')

        return;

    except ConfigParser.NoSectionError:
        print('NoSectionError')
        pass
    except ConfigParser.NoOptionError:
        print('NoOptionError')
        pass
    except ConfigParser.ParsingError:
        print('ParsingError')
        pass
    except OSError as e:
        if isinstance(e, FileNotFoundError):
            pass
        else:
            raise e
    except Exception as e:
        print(e)

    sys.exit("Here be dragons")

def make_config():
    pass

"""
    Get all VPN files
"""
def get_available_services():
    services = []

    trim_amount = len(vpn_ext) + 1

    for file in os.listdir(vpn_loc):
        if file.endswith(vpn_ext):
            services.append(file[:-trim_amount])

    return services