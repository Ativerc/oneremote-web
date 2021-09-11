
# Flows:  



1. **Website > MQTT Server > ESP32**   
  * Put in the MQTT server's IP in the website settings.  
  * Send Command to esp32 via MQTT server.

Pros:
* Easier to code

Cons:
* Hardcoded Wifi and MQTT server creds on ESP32 since there's no actual ESP32 onboarding.


2. **Onboard the ESP32 properly.** 
* On webpage have option to add device.
* Add Device: Scans for BT ESP32 devices.
* Press and hold button on ESP32 to put it in pairing mode aka. Turn on BT.
* Pair
* Send WIfi creds to ESP32 and connect esp32 to wifi.
* Send IP addr of ESP32 to website back over BT.
* Connect website to ESP32 via wifi network.
* Send MQTT server creds.



In both cases where are the commands stored? Website? An online server? A local db server? And auth for that server...how is that handled?