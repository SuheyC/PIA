universo = {
    "bancos": {
        "BancoAzteca": {
            "clientes": ["Juan"],
            "prestamos": ["Hipotecario"]
        },
        "Bancomer": {
            "clientes": ["Ana"],
            "prestamos": ["Personales"]
        }
    },
    "cuentas": {
        "Juan": "BancoAzteca",
        "Ana": "Bancomer"
    },
    "montos": {
        "Juan": 5000
    }
}

# funciones de las reglas 
def es_cliente(x):
    print(f"{x} es cliente?")
    if x in universo["cuentas"]:
        print(f"Si, {x} es cliente.\n")
    else:
        print(f"No, {x} no es cliente.\n")

def es_banco(y):
    print(f"{y} es un banco?")
    if y in universo["bancos"]:
        print(f"Si, {y} es un banco.\n")
    else:
        print(f"No, {y} no es un banco.\n")

def tiene_cuenta(x, y):
    print(f"{x} tiene una cuenta en {y}?")
    if universo["cuentas"].get(x) == y:
        print(f"Si, {x} tiene una cuenta en {y}.\n")
    else:
        print(f"No, {x} no tiene una cuenta en {y}.\n")

def ofrece_prestamo(y, w):
    print(f"{y} ofrece prestamos de tipo {w}?")
    if y in universo["bancos"] and w in universo["bancos"][y]["prestamos"]:
        print(f"Si, {y} ofrece prestamos de tipo {w}.\n")
    else:
        print(f"No, {y} no ofrece prestamos de tipo {w}.\n")

def recibio_monto(x, z):
    print(f"{x} recibio {z} pesos?")
    if universo["montos"].get(x) == z:
        print(f"Si, {x} recibio {z} pesos.\n")
    else:
        print(f"No, {x} no recibio {z} pesos.\n")


# aqui las consultas
if __name__ == "__main__":
    es_cliente("Juan")            
    es_cliente("BancoAzteca")     

    es_banco("BancoAzteca")       
    es_banco("Pedro")             

    tiene_cuenta("Juan", "BancoAzteca") 
    tiene_cuenta("Ana", "Bancomer")     
    tiene_cuenta("Ana", "BancoAzteca")  

    ofrece_prestamo("BancoAzteca", "Hipotecario") 
    ofrece_prestamo("Bancomer", "Autos electricos") 

    recibio_monto("Juan", 5000)   
    recibio_monto("Ana", 8000)    
