import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloWorld } from "../target/types/hello_world";

describe("hello-world", () => {
  let provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.HelloWorld as Program<HelloWorld>;

  const authority = provider.wallet.publicKey;

  let [helloWorld] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("hello-world")],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize("Hello World!").accounts({
      helloWorld,
      authority,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    console.log("tx signature: ", tx);

    // Fetch the state struct from the network.
    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);

  });

  it("get hello world!", async () => {

    // Add your test here.
    const tx = await program.methods.update("Davirain").accounts({
      helloWorld,
    }).rpc();

    console.log("tx signature: ", tx);


    // Fetch the state struct from the network.
    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);
  });


  it("read account name", async () => {

    // // Add your test here.
    // const tx = await program.methods.update("Davirain").accounts({
    //   accountName,
    // }).rpc();

    // console.log("tx signature: ", tx);

    // Fetch the state struct from the network.
    const accountState = await program.account.helloWorld.fetch(helloWorld);
    console.log("account state: ", accountState);
  });
});
