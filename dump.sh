#!/bin/bash

db=react
out_dir=dumps

mkdir -p $out_dir

tmp_file=$(mktemp)
echo "print('_ ' + db.getCollectionNames())" > $tmp_file
cols=`mongo $db $tmp_file | grep '_' | awk '{print $2}' | tr ',' ' '`

for c in $cols; do
    mongoexport -d $db -c $c -o "$out_dir/exp_${db}_${c}.json"
done

rm $tmp_file
