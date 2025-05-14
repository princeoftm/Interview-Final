  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  const getAccounts = async () => {
		if (!web3auth) {
			uiConsole('web3auth not initialized yet');
			return;
		}
		const privateKey = await web3auth?.provider?.request({method: 'solanaPublicKey',});
		uiConsole(privateKey);
  };

  const getBalance = async () => {
		if (!provider) {
			uiConsole('provider not initialized yet');
			return;
		}
		const solanaWallet = new SolanaWallet(provider);
		// Get user's Solana public address
		const accounts = await solanaWallet.requestAccounts();

		const connectionConfig: any = await solanaWallet.request({
			method: 'solana_provider_config',
			params: [],
		});

		const connection = new Connection(connectionConfig.rpcTarget);

		// Fetch the balance for the specified public key
		const balance = await connection.getBalance(new PublicKey(accounts[0]));
		uiConsole(balance / 1000000000);
  };
  const get_aidrop = async () => {
    if (!provider) {
      uiConsole('Provider not initialized yet');
      return;
    }
  
    const solanaWallet = new SolanaWallet(provider);
  
    // Get user's Solana public address
    const accounts = await solanaWallet.requestAccounts();
    const publicKey = accounts[0]; // Solana public key
  
    const connectionConfig: any = await solanaWallet.request({
      method: 'solana_provider_config',
      params: [],
    });
  
    const connection = new Connection(connectionConfig.rpcTarget);
  
    // Request an airdrop of 1 SOL (example value)
    const solValue = 1; // You can change this value to the desired airdrop amount
  
    try {
      const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey), // User's public key
        solValue * LAMPORTS_PER_SOL // Convert SOL to lamports
      );
  
      await connection.confirmTransaction(fromAirDropSignature);
      uiConsole(`Airdrop of ${solValue} SOL successful`);
    } catch (error) {
      console.error('Airdrop failed', error);
      uiConsole('Airdrop failed', error);
    }
  };
  
  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const web3 = new Web3(provider as any);

    // Get user's Ethereum public address
    const fromAddress = (await web3.eth.getAccounts())[0];

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(
      originalMessage,
      fromAddress,
      "test password!" // configure your own password here.
    );
    uiConsole(signedMessage);
  };