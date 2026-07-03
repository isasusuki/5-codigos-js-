import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Saldo inicial da conta fictícia
let saldo = 1000.00;

function exibirMenu() {
    console.log("\n=================================");
    console.log("🏧 SIMULADOR DE CAIXA ELETRÔNICO ");
    console.log("=================================");
    console.log(`💵 Saldo Atual: R$ ${saldo.toFixed(2)}`);
    console.log("---------------------------------");
    console.log("1. Depositar Dinheiro");
    console.log("2. Sacar Dinheiro");
    console.log("3. Sair");
    console.log("=================================");
    
    rl.question("Escolha uma opção (1-3): ", processarOpcao);
}

function processarOpcao(opcao) {
    switch (opcao.trim()) {
        case '1':
            console.log("\n--- DEPÓSITO ---");
            rl.question("Digite o valor que deseja depositar: R$ ", (valorStr) => {
                const valorDeposito = parseFloat(valorStr);

                if (isNaN(valorDeposito) || valorDeposito <= 0) {
                    console.log("❌ Valor inválido para depósito!");
                } else {
                    saldo += valorDeposito;
                    console.log(`\n✅ Depósito de R$ ${valorDeposito.toFixed(2)} realizado com sucesso!`);
                }
                exibirMenu();
            });
            break;
            
        case '2':
            console.log("\n--- SAQUE ---");
            rl.question("Digite o valor que deseja sacar: R$ ", (valorStr) => {
                const valorSaque = parseFloat(valorStr);

                if (isNaN(valorSaque) || valorSaque <= 0) {
                    console.log("❌ Valor inválido para saque!");
                } else if (valorSaque > saldo) {
                    console.log("❌ Saldo insuficiente para realizar esta operação!");
                } else {
                    saldo -= valorSaque;
                    console.log(`\n✅ Saque de R$ ${valorSaque.toFixed(2)} realizado com sucesso! Retire suas notas.`);
                }
                exibirMenu();
            });
            break;
            
        case '3':
            console.log("\n👋 Obrigado por usar nossos serviços bancários. Até logo!");
            rl.close();
            process.exit(0);
            
        default:
            console.log("\n❌ Opção inválida! Escolha de 1 a 3.");
            exibirMenu();
    }
}

// Inicia o simulador
exibirMenu();
