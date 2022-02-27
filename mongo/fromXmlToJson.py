import xmltodict
import sys
import json

dictionary = xmltodict.parse(sys.stdin.read(), attr_prefix='_')

pdv_liste = dictionary["pdv_liste"]["pdv"];



for pdv in pdv_liste:
    if "_latitude" in pdv and pdv["_latitude"]:
        pdv["_latitude"] = float(pdv["_latitude"])
    if "_longitude" in pdv and pdv["_longitude"] :
        pdv["_longitude"] = float(pdv["_longitude"])
        
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
    if "prix" in pdv :
        for cPrix in pdv["prix"] :
            cPrix["_valeur"] = float(cPrix["_valeur"])
            
    
    #fix rupture list bug
    if "rupture" in pdv and isinstance(pdv["rupture"], list) == False :
        pdv["rupture"] = [pdv["rupture"]]


print(json.dumps(dictionary["pdv_liste"]["pdv"], indent=4))