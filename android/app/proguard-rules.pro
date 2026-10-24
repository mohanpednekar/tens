# R8 rules for the release build (minifyEnabled + shrinkResources in app/build.gradle).
#
# Capacitor core and each Capacitor plugin ship consumer rules that keep @CapacitorPlugin classes
# and their @PluginMethod methods (the bridge reaches them by reflection). The rules below are a
# belt-and-braces copy for the app module, plus the WebView JavaScript interface.

-keep @com.getcapacitor.annotation.CapacitorPlugin public class * {
    @com.getcapacitor.annotation.PermissionCallback <methods>;
    @com.getcapacitor.annotation.ActivityCallback <methods>;
    @com.getcapacitor.annotation.Permission <methods>;
    @com.getcapacitor.PluginMethod public <methods>;
}
-keep public class * extends com.getcapacitor.Plugin { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.getcapacitor.** { *; }

# Readable crash stack traces in Play Console (upload the generated mapping.txt with each release).
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
