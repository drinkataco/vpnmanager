import os

"""
    Load configuration from file, or set defaults
"""
config_loc = "/Users/joshwalwyn/Desktop/openvpntest/"
config_ext = "ovpn"
show_flag = False
default_name = "default"
cred_loc = "/Users/joshwalwyn/Desktop/openvpntest/creds.txt"

"""
    Get all VPN files
"""
def get_available_services():
    services = []

    trim_amount = len(config_ext) + 1

    for file in os.listdir(config_loc):
        if file.endswith(config_ext):
            services.append(file[:-trim_amount])

    return services