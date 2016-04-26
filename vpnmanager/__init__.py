from flask import Flask, render_template
from .vpn import *
from .settings import *

app = Flask(__name__)

"""
    Form index
"""
@app.route("/")
def index():
    services = get_available_services()
    return render_template('index.html', services=services)

"""
    Form submission
"""
@app.route("/change", methods=["POST"])
def change_active_vpn():
    pass

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