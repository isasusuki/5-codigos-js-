import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Atributos iniciais do seu pet
let pet = {
    nome: "Buguinho",
    fome: 50,    // 0 = Sem fome, 100 = Faminto
    felicidade: 50 // 0 = Muito triste, 100 = Super feliz
};

function exibirMenu() {
    console.log("\n=================================");
    console.log(`🐾 PET VIRTUAL: ${pet.nome.toUpperCase()}`);
    console.log("=================================");
    console.log(`🍗 Fome: ${pet.fome}/100`);
    console.log(`❤️ Felicidade: ${pet.felicidade}/100`);
    console.log("---------------------------------");
    console.log("1. Alimentar o pet (-20 de fome)");
    console.log("2. Brincar com o pet (+20 de felicidade)");
    console.log("3. Deixar o tempo passar (Dificulta o jogo)");
    console.log("4. Sair do simulador");
    console.log("=================================");
    
    rl.question("O que quer fazer? (1-4): ", processarOpcao);
}

function processarOpcao(opcao) {
    switch (opcao.trim()) {
        case '1':
            // Alimenta e garante que a fome não fique menor que zero
            pet.fome = Math.max(0, pet.fome - 20);
            console.log(`\n✅ Você deu um petisco para ${pet.nome}. A fome diminuiu!`);
            exibirMenu();
            break;
            
        case '2':
            // Brinca e garante que a felicidade não passe de 100
            pet.felicidade = Math.min(100, pet.felicidade + 20);
            console.log(`\n✅ Você jogou a bolinha! ${pet.nome} adorou.`);
            exibirMenu();
            break;
            
        case '3':
            // O tempo passa: aumenta a fome e diminui a felicidade
            pet.fome = Math.min(100, pet.fome + 25);
            pet.felicidade = Math.max(0, pet.felicidade - 25);
            console.log(`\n⏳ Algumas horas se passaram... ${pet.nome} ficou com mais fome e tédio.`);
            
            // Alertas sobre o estado do pet
            if (pet.fome >= 90) console.log("⚠️ ATENÇÃO: Seu pet está quase morrendo de fome!");
            if (pet.felicidade <= 10) console.log("⚠️ ATENÇÃO: Seu pet está muito deprimido!");
            
            exibirMenu();
            break;
            
        case '4':
            console.log(`\n👋 Até logo! Cuide bem do ${pet.nome} da próxima vez.`);
            rl.close();
            process.exit(0);
            
        default:
            console.log("\n❌ Opção inválida! Escolha de 1 a 4.");
            exibirMenu();
    }
}

// Inicia o simulador
exibirMenu();
