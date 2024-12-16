# Exemplos de uso da API

## Usuario

#### GET todos os usuários:
```
curl -X GET http://localhost:5555/users/
```
#### GET usuário por ID:
```
curl -X GET http://localhost:5555/users/<ID do usuário>
```

#### GET usuário por NOME:
```
curl -X GET http://localhost:5555/users/name/<Nome do usuário>
```
#### POST novo usuário:
```
curl -X POST http://localhost:5555/users/ -H "Content-Type: application/json" -d '{
    "name": "Maria Silva",
    "age": 30,
    "cpf": "12345678901",
    "email": "maria.silva@example.com",
    "login": "maria.silva",
    "password": "SenhaSegura@123",
    "role": "Locatario"
}'
```
```
curl -X POST http://localhost:5555/users/ -H "Content-Type: application/json" -d '{
    "name": "Joao Santos",
    "age": 35,
    "cpf": "98765432101",
    "email": "joao.santos@example.com",
    "login": "joao.santos",
    "password": "SenhaSegura@456",
    "role": "Locador"
}'

```

#### UPDATE usuário:
```
curl -X PUT http://localhost:5555/users/<ID do usuário> -H "Content-Type: application/json" -d '{
    "name": "Maria Silva",
    "age": 31,
    "cpf": "12345678901",
    "email": "maria.silva@example.com",
    "login": "maria.silva",
    "password": "NovaSenha@123",
    "role": "Locatario"
}'
```

#### DELETE usuário:
```
curl -X DELETE http://localhost:5555/users/<ID do usuário>
```
#### DELETE todos os usuários:
```
curl -X DELETE http://localhost:5555/users/
```

#### GET todas as bicicletas:
```
curl -X GET http://localhost:5555/bikes/
```
#### GET bicicleta por ID:
```
curl -X GET http://localhost:5555/bikes/670d6e88c223c4ee0f5fce25
```

#### GET bicicletas por marca: 
```
curl -X GET http://localhost:5555/bikes/<Marca da bicicleta>
```

#### GET bicicletas por modelo:
```
curl -X GET http://localhost:5555/bikes/<Modelo da bicicleta>
```

#### POST nova bicicleta:
```
curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d  '{
    "landlord": "6720c8db0a67f8d02fea5286",
    "brand": "Caloi",
    "model": "City Tour",
    "price": 18,
    "weight": "15kg",
    "description": "Bicicleta urbana, ideal para trajetos na cidade. Possui marchas e é confortável para uso diário.",
    "available": true,
    "accessories": {
        "rearRack": true,
        "lights": true,
        "bell": true
    } 
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
    "landlord": "6720c8db0a67f8d02fea5286",
    "brand": "Specialized",
    "model": "Rockhopper",
    "price": 22,
    "weight": "13kg",
    "description": "Mountain bike robusta e ágil, ideal para trilhas e terrenos acidentados. Quadro de alumínio e 21 marchas.",
    "available": true,
    "accessories": {
        "suspension": true,
        "bottleHolder": true,
        "gloves": true
    }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Trek",
  "model": "Domane SL7",
  "price": 44,
  "weight": "9kg",
  "description": "Bicicleta de estrada de alta performance, projetada para ciclistas que procuram velocidade e eficiência. Leve e aerodinâmica.",
  "available": true,
  "accessories": {
      "onboardComputer": true,
      "comfortableSeat": true,
      "bottleHolder": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Sense",
  "model": "Impulse",
  "price": 25,
  "weight": "18kg",
  "description": "Bicicleta elétrica com motor auxiliar, ideal para trajetos urbanos e subidas. Autonomia de 60km com uma carga.",
  "available": true,
  "accessories": {
      "onboardComputer": true,
      "lights": true,
      "phoneHolder": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Houston",
  "model": "Disney Princesas",
  "price": 11,
  "weight": "8kg",
  "description": "Bicicleta infantil decorada com tema das Princesas Disney, perfeita para crianças que estão aprendendo a pedalar.",
  "available": true,
  "accessories": {
      "basket": true,
      "chainGuard": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Dahon",
  "model": "Vybe D7",
  "price": 29,
  "weight": "12kg",
  "description": "Bicicleta dobrável compacta e prática, ideal para quem precisa de uma opção portátil para trajetos curtos.",
  "available": true,
  "accessories": {
      "rearRack": true,
      "bell": true,
      "mirrors": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Trek",
  "model": "Marlin 7",
  "price": 40,
  "weight": "13.5kg",
  "description": "Bicicleta de montanha versátil, ideal para trilhas e terrenos acidentados.",
  "available": true,
  "accessories": {
      "helmet": true,
      "lights": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Specialized",
  "model": "Sirrus X 3.0",
  "price": 20,
  "weight": "12kg",
  "description": "Bicicleta urbana leve, ideal para deslocamento diário.",
  "available": true,
  "accessories": {
      "basket": true,
      "fenders": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Cannondale",
  "model": "Quick Neo SL 2",
  "price": 26,
  "weight": "15kg",
  "description": "Bicicleta elétrica com excelente autonomia para trajetos longos.",
  "available": true,
  "accessories": {
      "rearRack": true,
      "lights": true,
      "lock": true
  }
}'

curl -X POST http://localhost:5555/bikes/ -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Giant",
  "model": "TCR Advanced Pro",
  "price": 30,
  "weight": "8kg",
  "description": "Bicicleta de estrada de alto desempenho para ciclistas competitivos.",
  "available": true,
  "accessories": {
      "clipPedals": true,
      "bottleHolder": true
  }
}'
```
  
#### UPDATE bicicleta
```
curl -X PUT http://localhost:5555/bikes/<ID da bicicleta> -H "Content-Type: application/json" -d '{
  "landlord": "6720c8db0a67f8d02fea5286",
  "brand": "Dahon",
  "model": "Vybe D7",
  "price": 38,
  "weight": "12kg",
  "description": "Bicicleta dobrável compacta e prática, ideal para quem precisa de uma opção portátil para trajetos curtos.",
  "available": true,
  "accessories": {
      "rearRack": true,
      "bell": true,
      "mirrors": true
  }
}'
```

##### DELETE uma bicicleta:
```
curl -X DELETE http://localhost:5555/bikes/<ID da bicicleta>
```
##### DELETE todas as bicicletas:
```
curl -X DELETE http://localhost:5555/bikes/
```

##### GET todos os aluguéis:
```
curl -X GET http://localhost:5555/rents/
```


##### Criar novo contrato de aluguel
```
curl -X POST http://localhost:5555/rents/createRent/ -H "Content-Type: application/json" -d '{
    "landlord": "6720c8db0a67f8d02fea5286",
    "renter": "6720c9160a67f8d02fea5288",
    "bike": "6720c8db0a67f8d02fea5286",
    "startDate": "2024-10-14T10:00:00Z",
    "endDate": "2024-10-21T10:00:00Z",
    "rentPrice": Preço do aluguel
}'

curl -X POST http://localhost:5555/rents/createRent/ -H "Content-Type: application/json" -d '{
    "landlord": "6720c8db0a67f8d02fea5286",
    "renter": "6720c9160a67f8d02fea5288",
    "bike": "6720c8db0a67f8d02fea5286",
    "startDate": "2024-10-14T10:00:00Z",
    "endDate": "2024-10-21T10:00:00Z",
    "rentPrice": 150
}'
```

# Descrição dos atributos da bicicleta, na ordem em que estão definidos no Schema

Cestinha ou bagageiro – Ideal para uso urbano, especialmente para quem utiliza a bicicleta para transporte de objetos.<br />
Faróis e lanternas traseiras – Essenciais para segurança ao pedalar à noite ou em condições de baixa visibilidade.<br />
Paralamas – Úteis para quem pedala em regiões onde a bicicleta pode enfrentar lama ou chuva.<br />
Suporte de garrafa – Importante para ciclistas de longa distância e que precisam de fácil acesso a hidratação.<br />
Campainha ou buzina – Necessária em áreas urbanas e para a segurança em ciclovias.<br />
Cadeado – Importante para segurança e armazenamento ao ar livre.<br />
Suporte para celular – Acessório popular entre usuários que usam aplicativos de navegação ou monitoramento de desempenho.<br />
Bolsas laterais ou alforjes – Interessante para ciclistas que precisam carregar objetos ou para viagens de longa distância.<br />
Selim (assento) confortável – Diferentes tipos de selim podem atender a diferentes públicos, como ciclistas de lazer ou aqueles que priorizam performance.<br />
Retrovisores – Essenciais para segurança ao pedalar em estradas ou vias urbanas.<br />
Pedais com clip – Preferidos por ciclistas de performance, ajudam a manter o pé fixo para maior eficiência ao pedalar.<br />
Amortecedores – Importantes para quem usa a bicicleta em terrenos acidentados, como trilhas.<br />
Porta-bagagem traseiro – Acessório interessante para uso diário e transporte de objetos.<br />
Protetor de corrente – Evita que roupas ou objetos se prendam na corrente, comum em bicicletas urbanas.<br />
Computador de bordo – Acessório eletrônico para medir velocidade, distância, calorias e outros parâmetros.<br />
Capacete e luvas – Itens de segurança que podem ser indicados como acessórios adicionais.<br />