# Smart-Home-Solutions-UI

## How to deploy addon

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Build project:

   ```bash
   npm run build
   ```

3. Copy the /dist folder, Dockerfile and config.yaml to Home Assistant /addons folder using Samba or SSH

4. The folder structure should be:

   ```bash
   /addons/SmartifyUI/
    ├── Dockerfile
    ├── dist/
    └── config.yaml
   ```

5. In Home Assistant frontend go to Settings -> Add-ons -> add-on store (or click here https://my.home-assistant.io/redirect/supervisor_store/)

6. On the top right overflow menu, click the "Check for updates" button

7. Refresh your webpage when needed (could be several times)

8. You should now see a new section at the top of the store called "Local add-ons" that lists your add-on!

9. Click on your add-on, then Install your add-on and then Start your add-on

10. Check the "Logs" tab if everything is rigth and go to http://homeassistant.local/
