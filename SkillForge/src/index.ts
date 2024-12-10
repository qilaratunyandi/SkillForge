import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * Data struktur untuk sertifikat NFT dalam platform SkillForge.
 */
class Certificate {
  id: string;
  studentName: string;
  courseName: string;
  issueDate: Date;
  issuer: string;
  nftId: string; // Simulasi ID NFT unik
}

const certificatesStorage = StableBTreeMap<string, Certificate>(0);

const app = express();
app.use(express.json());

/**
 * Endpoint untuk membuat sertifikat NFT.
 */
app.post("/certificates", (req, res) => {
  const certificate: Certificate = {
    id: uuidv4(),
    nftId: `nft-${uuidv4()}`,
    issueDate: getCurrentDate(),
    ...req.body,
  };
  certificatesStorage.insert(certificate.id, certificate);
  res.json(certificate);
});

/**
 * Endpoint untuk mengambil semua sertifikat.
 */
app.get("/certificates", (req, res) => {
  res.json(certificatesStorage.values());
});

/**
 * Endpoint untuk mengambil detail sertifikat berdasarkan ID.
 */
app.get("/certificates/:id", (req, res) => {
  const certificateId = req.params.id;
  const certificateOpt = certificatesStorage.get(certificateId);
  if (!certificateOpt) {
    res.status(404).send(`Certificate with id=${certificateId} not found`);
  } else {
    res.json(certificateOpt);
  }
});

/**
 * Endpoint untuk memperbarui data sertifikat.
 */
app.put("/certificates/:id", (req, res) => {
  const certificateId = req.params.id;
  const certificateOpt = certificatesStorage.get(certificateId);
  if (!certificateOpt) {
    res.status(400).send(`Certificate with id=${certificateId} not found`);
  } else {
    const certificate = certificateOpt;
    const updatedCertificate = {
      ...certificate,
      ...req.body,
    };
    certificatesStorage.insert(certificate.id, updatedCertificate);
    res.json(updatedCertificate);
  }
});

/**
 * Endpoint untuk menghapus sertifikat.
 */
app.delete("/certificates/:id", (req, res) => {
  const certificateId = req.params.id;
  const deletedCertificate = certificatesStorage.remove(certificateId);
  if (!deletedCertificate) {
    res.status(400).send(`Couldn't delete the certificate with id=${certificateId}. Not found.`);
  } else {
    res.json(deletedCertificate);
  }
});

/**
 * Menjalankan server.
 */
app.listen();

function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}
