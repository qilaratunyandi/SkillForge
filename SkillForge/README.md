SkillForge: NFT-Based Vocational Certification Platform
Features
Certificate Management:
Create, retrieve, update, and delete vocational certificates issued as NFTs.
NFT Integration:
Each certificate has a unique NFT ID, ensuring ownership and verifiability.
Blockchain Persistence:
Data is stored using StableBTreeMap to survive canister upgrades.
REST API:
Provides a simple RESTful interface for managing certificates.
Tech Stack
Azle: TypeScript framework for building canisters on the Internet Computer (IC).
Express.js: Backend framework to create RESTful APIs.
UUID: For generating globally unique IDs.
DFINITY: Internet Computer's infrastructure for hosting blockchain canisters.
API Endpoints
Method	Endpoint	Description
POST	/certificates	Create a new certificate.
GET	/certificates	Retrieve all certificates.
GET	/certificates/:id	Retrieve a specific certificate by ID.
PUT	/certificates/:id	Update an existing certificate.
DELETE	/certificates/:id	Delete a certificate by ID.
License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this project under the terms of the license.