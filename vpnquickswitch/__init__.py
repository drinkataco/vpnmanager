from flask import Flask, render_template, request, jsonify
from .vpn import *
from .settings import *

vpn = Vpn()

site_root = settings.get_value('uri')

if (site_root == ''):
    site_root = '/'
    app = Flask(__name__)
else:
    site_root = site_root + '/'
    app = Flask(__name__, static_url_path = site_root + 'static')

"""
    Form index
"""
@app.route(site_root)
def index():
    services = vpn.get_available_services()
    return render_template('index.html', services=services)

"""
    Form submission
"""
@app.route(site_root + "change", methods=["POST"])
def change_active_vpn():
    status = vpn.set_vpn_config(request.values['selection'])
    if (status):
        return '', 200
    else:
        return '', 500

"""
    Gets current openvpn information
"""
@app.route(site_root + "status", methods=["GET"])
def get_current_status():
    return jsonify(vpn.get_current_status())

"""
    Get tagline
"""
@app.route(site_root + "tagline", methods=["GET"])
def update_tagline():
    return render_template('tagline.html', status=vpn.get_current_status())

"""
    Change default VPN service
"""
@app.route(site_root + "change-default", methods=["POST"])
def change_default_service():
    pass
