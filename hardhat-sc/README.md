### Hardhat Commands

#### Opensea test url
> https://testnets.opensea.io/assets/0xE19e397f003D6F0d68550c29DBa8F58A5dAeC1Dd/1

#### deploy to Rinkeby 

`npx hardhat run scripts/deploy.js --network rinkeby`

#### Working with SC inside console

`npx hardhat console --network rinkeby`


```
var a = await ethers.getContractFactory('NFTee')
`eg: 0xE19e397f003D6F0d68550c29DBa8F58A5dAeC1Dd`
var b = await a.attach("YOUR_DEPLOYED_CONTRACT_ADDRESS")

var c = await b.mintNFT('https://bafyreie6yqecx2ivynzn3o4rg7fxabjg2i4fa7wuuugmycnv3ojht4jqw4.ipfs.dweb.link/metadata.json')

var d = await d.wait()



```

> Metadata
```
{
  "attributes": [
    { "trait_type": "Background", "value": "Gradient Tres" },
    { "trait_type": "Body", "value": "Orange Circle" },
    { "trait_type": "Face", "value": "Smile" }
  ],
  "description": "A collection of 960 (1/1) Crypto Bribers (vol. 1). A portion of sales and royalties gets donated to Charity Bribes, where they raise money for good causes by bribing celebrities.",
  "name": "Briber",
  "image": "ipfs://QmPCe2qNjJsxyJb9hCm5JDcSb4tMN71N6VM14hEcfyYcgX/0.png"
}
```