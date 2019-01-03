
DIRNAME=image
mkdir $DIRNAME
sh rename.sh drawable-mdpi $DIRNAME @1x
sh rename.sh drawable-hdpi $DIRNAME @1.5x
sh rename.sh drawable-xhdpi $DIRNAME @2x
sh rename.sh drawable-xxhdpi $DIRNAME @3x
sh rename.sh drawable-xxxhdpi $DIRNAME @4x
