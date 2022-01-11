/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {

        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        const getOptions = () => {
            return {
                destinationType: Camera.DestinationType.FILE_URI,
                quality: 0.5 * 100,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                correctOrientation: true,
                mediaType: Camera.MediaType.PICTURE,
                targetWidth: 1920,
                encodingType: Camera.EncodingType.JPEG,
                saveToPhotoAlbum: false,
                startOnScreen: 'IMAGE',
                max: 3,
            };
        }

        const openCamera = () => {
            // cordova.plugins.backgroundMode.setDefaults({
            //     silent: true
            // });

            // cordova.plugins.backgroundMode.enable();

            /* cordova-plugin-camera */
            navigator.camera.getPicture(
                (result) => {
                    const paragraph = document.getElementById('camera-result');
                    paragraph.append(result);
                    console.log(result);
                    // cordova.plugins.backgroundMode.disable();
                },
                (error) => {
                    console.log('Camera error', error);
                    // cordova.plugins.backgroundMode.disable();
                },
                getOptions()
            );
        };
        const cameraButton = document.getElementById('open-camera');
        cameraButton.addEventListener("click", openCamera, false);


        const openAdvancedImagePicker = () => {
            // cordova.plugins.backgroundMode.setDefaults({
            //     silent: true
            // });

            // cordova.plugins.backgroundMode.enable();

           /* cordova-plugin-advanced-imagepicker */
           window.AdvancedImagePicker.present(
            getOptions(),
            (result) => {
                const paragraph = document.getElementById('advanced-image-picker-result');
                result.forEach(r => paragraph.append(`${r.src}\n`));
                console.log(result);
        //         cordova.plugins.backgroundMode.disable();
            },
            (error) => {
                console.log('Image picker error: ', error);
        //         cordova.plugins.backgroundMode.disable();
            }
        );
        };
        const advancedImagePickerButton = document.getElementById('open-advanced-image-picker');
        advancedImagePickerButton.addEventListener("click", openAdvancedImagePicker, false);
  
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();