import xmltodict
import sys
import json

dictionary = xmltodict.parse(sys.stdin.read(), attr_prefix='_')

pdv_liste = dictionary["pdv_liste"]["pdv"];



for pdv in pdv_liste:
    
    #fix horaires->jour list bug
    if "horaires" in pdv :
        horaires = pdv["horaires"]
        if "jour" in horaires and isinstance(pdv["horaires"]["jour"], list) == False :
            pdv["horaires"]["jour"] = [pdv["horaires"]["jour"]]
    
    # fix services list bug
    services = pdv["services"]
    if services is None :
        pdv["services"] = []
    else :
        if services["service"] is None :
            pdv["services"] = []
        else :
            if isinstance(services["service"], list):
                pdv["services"] = services["service"]
            else :
                pdv["services"] = [services["service"]]
    
    #fix prix list bug
    if "prix" in pdv and isinstance(pdv["prix"], list) == False :
        if pdv["prix"] is None :
            pdv["prix"] = []
        else :
            pdv["prix"] = [pdv["prix"]]
    
    #fix rupture list bug
    if "rupture" in pdv and isinstance(pdv["rupture"], list) == False :
        pdv["rupture"] = [pdv["rupture"]]


print(json.dumps(dictionary["pdv_liste"]["pdv"], indent=4))