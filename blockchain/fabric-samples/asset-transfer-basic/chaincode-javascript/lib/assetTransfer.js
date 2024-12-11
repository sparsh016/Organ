// "use strict";

// const stringify = require("json-stringify-deterministic");
// const sortKeysRecursive = require("sort-keys-recursive");
// const { Contract } = require("fabric-contract-api");

// class AssetTransfer extends Contract {
//   // For caliper testing
//   // CreateAsset issues a new asset to the world state with given details.
//   async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
//     const exists = await this.AssetExists(ctx, id);
//     if (exists) {
//       throw new Error(`The asset ${id} already exists`);
//     }

//     const asset = {
//       ID: id,
//       Color: color,
//       Size: size,
//       Owner: owner,
//       AppraisedValue: appraisedValue,
//     };
//     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
//     await ctx.stub.putState(
//       id,
//       Buffer.from(stringify(sortKeysRecursive(asset)))
//     );
//     return JSON.stringify(asset);
//   }

//   // ReadAsset returns the asset stored in the world state with given id.
//   async ReadAsset(ctx, id) {
//     const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
//     if (!assetJSON || assetJSON.length === 0) {
//       throw new Error(`The asset ${id} does not exist`);
//     }
//     return assetJSON.toString();
//   }

//   // DeleteAsset deletes an given asset from the world state.
//   async DeleteAsset(ctx, id) {
//     const exists = await this.AssetExists(ctx, id);
//     if (!exists) {
//       throw new Error(`The asset ${id} does not exist`);
//     }
//     return ctx.stub.deleteState(id);
//   }

//   // Organ donation
//   async AssetExists(ctx, id) {
//     const assetJSON = await ctx.stub.getState(id);
//     return assetJSON && assetJSON.length > 0;
//   }

//   async addPatient(
//     ctx,
//     type,
//     id,
//     name,
//     age,
//     bloodType,
//     organType,
//     bmi,
//     hospitalId
//   ) {
//     let exists = await this.AssetExists(ctx, id);
//     if (exists) {
//       throw new Error(`The asset ${id} already exists`);
//     }
//     exists = await this.AssetExists(ctx, hospitalId);
//     if (!exists) {
//       throw new Error(`Write a valid hospitalID`);
//     }

//     const patient = {
//       type: type.toLowerCase(),
//       id,
//       name,
//       age,
//       bloodType: bloodType.toUpperCase(),
//       organType: organType.toLowerCase(),
//       bmi,
//       hospitalId,
//       doctorsAssigned: [],
//     };

//     exists = await this.AssetExists(ctx, organType);
//     if (!exists) {
//       const organ = {
//         organType: organType.toLowerCase(),
//         donorsAvailable: [],
//         receiverArray: [],
//       };
//       await ctx.stub.putState(organType, Buffer.from(JSON.stringify(organ)));
//     }

//     await ctx.stub.putState(id, Buffer.from(JSON.stringify(patient)));

//     return "Patient added successfully";
//   }

//   async addHospital(ctx, hospitalId, hospitalName) {
//     let exists = await this.AssetExists(ctx, hospitalId);
//     if (exists) {
//       throw new Error(`Already a hospital with ${hospitalId} exists`);
//     }

//     const hospital = {
//       hospitalId: hospitalId.toUpperCase(),
//       hospitalName,
//     };

//     await ctx.stub.putState(hospitalId, Buffer.from(JSON.stringify(hospital)));

//     return "Hospital added successfully";
//   }

//   async addDoctor(ctx, id, name, specialization) {
//     const exists = await this.AssetExists(ctx, id);
//     if (exists) {
//       throw new Error(`Doctor with Id ${id} already exists`);
//     }

//     const doctor = {
//       type: "doctor",
//       id,
//       name,
//       specialization,
//       patientsAssigned: [],
//     };

//     await ctx.stub.putState(id, Buffer.from(JSON.stringify(doctor)));

//     return "Doctor added successfully";
//   }

//   async addPatienttoOrganList(ctx, patientId) {
//     let patientBuffer = await ctx.stub.getState(patientId);
//     let patient = JSON.parse(patientBuffer.toString());

//     const organtype = patient.organType;

//     let organBuffer = await ctx.stub.getState(organtype);
//     let organ = JSON.parse(organBuffer.toString());

//     if (patient.type == "donor") organ.donorsAvailable.push(patientId);
//     else organ.receiverArray.push(patientId);

//     await ctx.stub.putState(organtype, Buffer.from(JSON.stringify(organ)));
//     return "donor successfully added to organ donation list";
//   }

//   async assignDoctor(ctx, patientId, doctorId) {
//     const exists =
//       (await this.AssetExists(ctx, patientId)) &&
//       (await this.AssetExists(ctx, doctorId));
//     if (!exists) {
//       throw new Error(`Either patient or doctor id does not exist`);
//     }

//     const patientBuffer = await ctx.stub.getState(patientId);
//     const doctorBuffer = await ctx.stub.getState(doctorId);

//     const doctor = JSON.parse(doctorBuffer.toString());
//     const patient = JSON.parse(patientBuffer.toString());

//     doctor.patientsAssigned.push(patientId);
//     patient.doctorsAssigned.push(doctorId);

//     await ctx.stub.putState(doctorId, Buffer.from(JSON.stringify(doctor)));
//     await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));

//     return "Doctor assigned to patient successfully";
//   }

//   async getAllPatients(ctx, type) {
//     const patients = [];
//     const iterator = await ctx.stub.getStateByRange("", "");
//     let result = await iterator.next();
//     while (!result.done) {
//       const strValue = Buffer.from(result.value.value.toString()).toString(
//         "utf8"
//       );
//       let record;
//       try {
//         record = JSON.parse(strValue);
//       } catch (err) {
//         console.log(err);
//         record = strValue;
//       }
//       if (record.type == type && record.id.length > 0) {
//         patients.push(record);
//       }

//       result = await iterator.next();
//     }
//     return JSON.stringify(patients);
//   }

//   async getAllDoctors(ctx) {
//     const doctors = [];
//     const iterator = await ctx.stub.getStateByRange("", "");
//     let result = await iterator.next();
//     while (!result.done) {
//       const strValue = Buffer.from(result.value.value.toString()).toString(
//         "utf8"
//       );
//       let record;
//       try {
//         record = JSON.parse(strValue);
//       } catch (err) {
//         console.log(err);
//         record = strValue;
//       }
//       if (record.type == "doctor" && record.id.length > 0) {
//         doctors.push(record);
//       }

//       result = await iterator.next();
//     }
//     return JSON.stringify(doctors);
//   }

//   async deletePerson(ctx, id) {
//     await ctx.stub.deleteState(id);
//     return `Person with id=${id} removed from inventory`;
//   }

//   async displayPerson(ctx, id) {
//     const exists = await this.AssetExists(ctx, id);
//     if (!exists) throw new Error(`Person with such id does not exist`);
//     const person = await ctx.stub.getState(id);

//     return `Details of person with id=${id} are:- \n ${person} \n`;
//   }

//   async displayOrganDetails(ctx, organType) {
//     organType = organType.toLowerCase();

//     const exists = await this.AssetExists(ctx, organType);
//     if (!exists) throw new Error(`Currently no donor of such organ is there`);

//     const organBuffer = await ctx.stub.getState(organType);
//     const organ = JSON.parse(organBuffer.toString());

//     return `Donors of organ= ${organ.organType} available are:- ${organ.donorsAvailable}`;
//   }

//   async matchOrgan(ctx, minAge, maxAge, donorMinBMI, donorMaxBMI, receiverID) {
//     const exists = await this.AssetExists(ctx, receiverID);
//     if (!exists) {
//       throw new Error(`No such organReceiver is there`);
//     }

//     const organReceiver = await ctx.stub.getState(receiverID);
//     const receiver = JSON.parse(organReceiver.toString());

//     let matchedPatients = [];

//     const iterator = await ctx.stub.getStateByRange("", "");
//     while (true) {
//       const result = await iterator.next();

//       if (result.value && result.value.value.toString()) {
//         const patient = JSON.parse(result.value.value.toString("utf8"));

//         if (
//           patient.type == "donor" &&
//           patient.age >= minAge &&
//           patient.age <= maxAge &&
//           patient.bloodType === receiver.bloodType &&
//           patient.bmi >= donorMinBMI &&
//           patient.bmi <= donorMaxBMI &&
//           patient.organType === receiver.organType
//         ) {
//           matchedPatients.push(patient);
//         }
//       }

//       if (result.done) {
//         await iterator.close();
//         break;
//       }
//     }

//     matchedPatients.sort((a, b) => {
//       if (a.age !== b.age) {
//         return a.age - b.age; // Sort by age ascending
//       } else {
//         return a.bmi - b.bmi; // If age is the same, sort by BMI ascending
//       }
//     });

//     let last = matchedPatients.length;

//     // if (last==0) return "No matching donor found";
//     // return `Matched donors are:- ${matchedPatients} \n The best pick out of them= ${matchedPatients[last-1]}`;

//     return JSON.stringify(matchedPatients);
//   }

//   async addFinalizedTransfer(ctx, transID, donorID, receiverID) {
//     let exists = await this.AssetExists(ctx, donorID);
//     if (!exists) {
//       throw new Error(`No organDonor with id=${donorID}`);
//     }
//     exists = await this.AssetExists(ctx, receiverID);
//     if (!exists) {
//       throw new Error(`No such organReceiver with id=${receiverID}`);
//     }

//     let donorBuffer = await ctx.stub.getState(donorID);
//     let donor = JSON.parse(donorBuffer.toString());

//     let receiverBuffer = await ctx.stub.getState(receiverID);
//     let receiver = JSON.parse(receiverBuffer.toString());

//     const organBuffer = await ctx.stub.getState(donor.organType);
//     const organ = JSON.parse(organBuffer.toString());

//     let index = organ.donorsAvailable.indexOf(donorID);
//     if (index > -1) {
//       organ.donorsAvailable.splice(index, 1);
//     }

//     index = organ.receiverArray.indexOf(receiverID);
//     if (index > -1) {
//       organ.receiverArray.splice(index, 1);
//     }

//     await ctx.stub.putState(
//       organ.organtype,
//       Buffer.from(JSON.stringify(organ))
//     );

//     let ready = false;
//     if (donor.hospitalId == receiver.hospitalId) {
//       ready = true;
//     }

//     const transferOrgan = {
//       transId: transID,
//       donorId: donorID,
//       receiverId: receiverID,
//       readyToTransplant: ready,
//     };

//     await ctx.stub.putState(
//       transID,
//       Buffer.from(JSON.stringify(transferOrgan))
//     );

//     return `Transfer of organ from  ${donorID} to ${receiverID} finalized `;
//   }
// }

// module.exports = AssetTransfer;

/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Deterministic JSON.stringify()
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");

class AssetTransfer extends Contract {
  async InitLedger(ctx) {
    const assets = [
      {
        ID: "asset1",
        Color: "blue",
        Size: 5,
        Owner: "Tomoko",
        AppraisedValue: 300,
      },
      {
        ID: "asset2",
        Color: "red",
        Size: 5,
        Owner: "Brad",
        AppraisedValue: 400,
      },
      {
        ID: "asset3",
        Color: "green",
        Size: 10,
        Owner: "Jin Soo",
        AppraisedValue: 500,
      },
      {
        ID: "asset4",
        Color: "yellow",
        Size: 10,
        Owner: "Max",
        AppraisedValue: 600,
      },
      {
        ID: "asset5",
        Color: "black",
        Size: 15,
        Owner: "Adriana",
        AppraisedValue: 700,
      },
      {
        ID: "asset6",
        Color: "white",
        Size: 15,
        Owner: "Michel",
        AppraisedValue: 800,
      },
    ];

    for (const asset of assets) {
      asset.docType = "asset";
      // example of how to write to world state deterministically
      // use convetion of alphabetic order
      // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
      // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
      await ctx.stub.putState(
        asset.ID,
        Buffer.from(stringify(sortKeysRecursive(asset)))
      );
    }
  }

  // CreateAsset issues a new asset to the world state with given details.
  async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
    const exists = await this.AssetExists(ctx, id);
    if (exists) {
      throw new Error(`The asset ${id} already exists`);
    }

    const asset = {
      ID: id,
      Color: color,
      Size: size,
      Owner: owner,
      AppraisedValue: appraisedValue,
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );
    return JSON.stringify(asset);
  }

  // ReadAsset returns the asset stored in the world state with given id.
  async ReadAsset(ctx, id) {
    const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${id} does not exist`);
    }
    return assetJSON.toString();
  }

  // UpdateAsset updates an existing asset in the world state with provided parameters.
  async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
    const exists = await this.AssetExists(ctx, id);
    if (!exists) {
      throw new Error(`The asset ${id} does not exist`);
    }

    // overwriting original asset with new asset
    const updatedAsset = {
      ID: id,
      Color: color,
      Size: size,
      Owner: owner,
      AppraisedValue: appraisedValue,
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    return ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
    );
  }

  // DeleteAsset deletes an given asset from the world state.
  async DeleteAsset(ctx, id) {
    const exists = await this.AssetExists(ctx, id);
    if (!exists) {
      throw new Error(`The asset ${id} does not exist`);
    }
    return ctx.stub.deleteState(id);
  }

  // AssetExists returns true when asset with given ID exists in world state.
  async AssetExists(ctx, id) {
    const assetJSON = await ctx.stub.getState(id);
    return assetJSON && assetJSON.length > 0;
  }

  // TransferAsset updates the owner field of asset with given id in the world state.
  async TransferAsset(ctx, id, newOwner) {
    const assetString = await this.ReadAsset(ctx, id);
    const asset = JSON.parse(assetString);
    const oldOwner = asset.Owner;
    asset.Owner = newOwner;
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );
    return oldOwner;
  }

  // GetAllAssets returns all assets found in the world state.
  async GetAllAssets(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }
}

module.exports = AssetTransfer;

// class PatientWaitingListContract extends Contract {
//     async AssetExists(ctx, id) {
//       const assetJSON = await ctx.stub.getState(id);
//       return assetJSON && assetJSON.length > 0;
//     }

//     async addDonor(
//       ctx,
//       patientId,
//       patientName,
//       patientAge,
//       bloodType,
//       organType
//     ) {
//       let exists = await this.AssetExists(ctx, patientId);
//       if (exists) {
//         throw new Error(The asset ${id} already exists);
//       }
//       const patient = {
//         patientId,
//         patientName,
//         patientAge,
//         bloodType,
//         organType,
//         doctorsAssigned: [],
//       };

//       exists= await this.AssetExists(ctx,organType);
//       if(!exists){
//           const organ={
//              organType,
//              donorsAvailable: [],
//           };
//           await ctx.stub.putState(organType,Buffer.from(JSON.stringify(organ)));
//       }
//       await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));

//       return "Patient added successfully";
//     }

//     async addDonortoOrganList(ctx,patientId){

//         let patientBuffer=await ctx.stub.getState(patientId);
//         let donor=JSON.parse(patientBuffer.toString());

//         const organtype=donor.organType;

//         let organBuffer=await ctx.stub.getState(organtype);
//         let organ=JSON.parse(organBuffer.toString());
//         organ.donorsAvailable.push(patientId);

//         await ctx.stub.putState(organtype, Buffer.from(JSON.stringify(organ)));
//         return 'donor successfully added to organ donation list';
//     }

//     async addDoctor(ctx, doctorId, name, specialization) {
//       const exists = await this.AssetExists(ctx, doctorId);
//       if (exists) {
//         throw new Error(Doctor with Id ${doctorId} already exists);
//       }

//       const doctor = {
//         doctorId,
//         name,
//         specialization,
//         patientsAssigned: [],
//       };

//       await ctx.stub.putState(doctorId, Buffer.from(JSON.stringify(doctor)));

//       return "Doctor added successfully";
//     }

//     async assignDoctor(ctx, patientId, doctorId) {
//       const exists =
//         (await this.AssetExists(ctx, patientId)) &&
//         (await this.AssetExists(ctx, doctorId));
//       if (!exists) {
//         throw new Error(Either patient or doctor id does not exist);
//       }

//       const patientBuffer = await ctx.stub.getState(patientId);
//       const doctorBuffer = await ctx.stub.getState(doctorId);

//       const doctor = JSON.parse(doctorBuffer.toString());
//       const patient = JSON.parse(patientBuffer.toString());

//       doctor.patientsAssigned.push(patientId);
//       patient.doctorsAssigned.push(doctorId);

//       await ctx.stub.putState(doctorId, Buffer.from(JSON.stringify(doctor)));
//       await ctx.stub.putState(patientId, Buffer.from(JSON.stringify(patient)));

//       return "Doctor assigned to patient successfully";
//     }

//     async getAllDonors(ctx) {
//       const patients = [];
//       const iterator = await ctx.stub.getStateByRange("", "");
//       let result = await iterator.next();
//       while (!result.done) {
//         const strValue = Buffer.from(result.value.value.toString()).toString(
//           "utf8"
//         );
//         let record;
//         try {
//           record = JSON.parse(strValue);
//         } catch (err) {
//           console.log(err);
//           record = strValue;
//         }
//         if (record.patientId && record.patientId.length > 0) {
//           patients.push(record);
//         }

//         result = await iterator.next();
//       }
//       return JSON.stringify(patients);
//     }

//     async getAllDoctors(ctx) {
//       const doctors = [];
//       const iterator = await ctx.stub.getStateByRange("", "");
//       let result = await iterator.next();
//       while (!result.done) {
//         const strValue = Buffer.from(result.value.value.toString()).toString(
//           "utf8"
//         );
//         let record;
//         try {
//           record = JSON.parse(strValue);
//         } catch (err) {
//           console.log(err);
//           record = strValue;
//         }
//         if (record.doctorId && record.doctorId.length > 0) {
//           doctors.push(record);
//         }

//         result = await iterator.next();
//       }
//       return JSON.stringify(doctors);
//     }

//     async deletePerson(ctx, id) {
//       await ctx.stub.deleteState(id);
//       return Person with id=${id} removed from inventory;
//     }

//     async displayPerson(ctx, id) {
//       const exists=await this.AssetExists(ctx,id);
//       if(!exists)  throw new Error(Person with such id does not exist);
//       const person = await ctx.stub.getState(id);

//       return Details of person with id=${id} are:- \n ${person} \n;
//     }

//     async displayOrganDetails(ctx,organType){

//       const exists=await this.AssetExists(ctx,organType);
//       if(!exists)  throw new Error(Currently no donor of such organ is there);

//       const organBuffer = await ctx.stub.getState(organType);
//       const organ=JSON.parse(organBuffer.toString());
//       return List of all donors of organtype:-${organ.organType} are:- \n ${organ.donorsAvailable} \n;
//     }
//   }

//   module.exports = PatientWaitingListContract;
