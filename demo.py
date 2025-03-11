import subprocess

def check_wifi_driver():
    try:
        result = subprocess.run(['nmcli', 'device', 'status'], capture_output=True, text=True)
        if 'wifi' in result.stdout:
            print("WiFi driver is installed and working.")
        else:
            print("WiFi driver is not installed or not working.")
            install_wifi_driver()
    except Exception as e:
        print(f"An error occurred: {e}")

def install_wifi_driver():
    try:
        print("Installing WiFi driver...")
        # Replace the following command with the actual command to install the WiFi driver
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'wifi-driver-package'], check=True)
        print("WiFi driver installed successfully.")
    except Exception as e:
        print(f"An error occurred during installation: {e}")

print("Hello, World!")
check_wifi_driver()
