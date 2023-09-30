Java.perform(function () {
    var AmpPackWrapper = Java.use("com.cf.ampunpacker.AmpPackWrapper");
    AmpPackWrapper.loadEncryptedAmpFileData.overload("android.content.Context","java.lang.String").implementation = function(ctx,file) {

        console.log(file)

        var map = this.loadEncryptedAmpFileData(ctx,file)
        
        var iterator = map.keySet().iterator()

        while(iterator.hasNext())
        {
            var key = iterator.next().toString()
            console.log(key)
            var name = key.split("/")
            var filePath = "/data/data/com.cf.dubaji/dump/" + key
            //var filePath = "/data/data/com.cf.dubaji/" + name[name.length - 1]
            //var filePath = '/sdcard/Pictures/' + name[name.length - 1]
            //var filePath = '/sdcard/Pictures/' + key
            var file = new File(filePath, 'wb');

            var value = map.get(key)

            var buffer = Java.cast(value, Java.use("[B"));
            var result = Java.array('byte', buffer);

            file.write(new Int8Array(result));
            file.flush();
            file.close();
        }

        return map
    };
})
