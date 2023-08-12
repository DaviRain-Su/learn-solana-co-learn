import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";

describe("counter", () => {
  let provider = anchor.AnchorProvider.env();
  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  console.log("program ", program);

  const user = provider.wallet.publicKey;
  console.log("user ", user);

  let [counter] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  console.log("counter pda: ", counter);

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      counter,
      user,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).rpc();

    console.log("Your transaction signature", tx);

    // Fetch the state struct from the network.
    const accountState = await program.account.counter.fetch(counter);
    console.log("account state: ", accountState);
  });


  it("Is Increment!", async () => {
    // Add your test here.
    const tx = await program.methods.increment().accounts({
      counter,
      user,
    }).rpc();

    console.log("Your transaction signature", tx);

    // Add your test here.
    const tx2 = await program.methods.increment().accounts({
      counter,
      user,
    }).rpc();

    console.log("Your transaction signature", tx2);

    // Fetch the state struct from the network.
    const accountState = await program.account.counter.fetch(counter);
    console.log("Increment: account state: ", accountState);
  });

  it("Is Decrement!", async () => {
    // Add your test here.
    const tx = await program.methods.decrement().accounts({
      counter,
      user,
    }).rpc();

    console.log("Your transaction signature", tx);

    // Fetch the state struct from the network.
    const accountState = await program.account.counter.fetch(counter);
    console.log("Decrement: account state: ", accountState);
  });
});
