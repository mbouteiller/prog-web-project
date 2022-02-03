import xmltodict
import sys
import json

dictionary = xmltodict.parse(sys.stdin.read(), attr_prefix='_')
print(json.dumps(dictionary["pdv_liste"]["pdv"], indent=4))