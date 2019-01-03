for entry in `ls $1`; do
    cp $1/$entry $2/${entry%%.png}$3.png
    echo $1/$entry $2/ ${entry%%.png}$3.png
done
