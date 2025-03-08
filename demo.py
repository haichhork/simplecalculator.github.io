import subprocess

def check_wifi_driver():
    try:
        result = subprocess.run(['nmcli', 'device', 'status'], capture_output=True, text=True)
        if 'wifi' in result.stdout:
            print("WiFi driver is installed and working.")
        else:
            print("WiFi driver is not installed or not working.")
    except Exception as e:
        print(f"An error occurred: {e}")

print("Hello, World!")
check_wifi_driver()