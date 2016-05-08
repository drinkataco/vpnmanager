from flask import Flask, render_template, request
from .vpn import *
from .settings import *

app = Flask(__name__)
vpn = Vpn()

"""
    Form index
"""
@app.route("/")
def index():
    services = vpn.get_available_services()
    return render_template('index.html', services=services)

"""
    Form submission
"""
@app.route("/change", methods=["POST"])
def change_active_vpn():
    status = vpn.set_vpn_config(request.values['selection'])
    if (status):
        return '', 200
    else:
        return '', 500

"""
    Gets current openvpn information
"""
@app.route("/status", methods=["GET"])
def get_current_status():
    pass

"""
    Change default VPN service
"""
@app.route("/change-default", methods=["POST"])
def change_default_servoce():
    pass