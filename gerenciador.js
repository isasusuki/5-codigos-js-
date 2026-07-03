import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Estoque inicial da cafeteria
let estoque = {
    cafeGrama: 500,
    leiteMl: 1000,
    copos: 20
};

// Histórico de faturamento
let caixaDinheiro = 0.00;

// Cardápio simulado (receita e preço de cada item)
const cardapio = {
    '1': { nome: "Espresso", preco: 6.00, cafe: 20, leite: 0 },
    '2': { nome: "Macchiato", preco: 8.50, cafe: 20, leite: 50 },
    '3': { nome: "Café Latte", preco: 11.00, cafe: 20, leite: 150 }
};

function exibirMenu() {
    console.log("\n=================================");
    console.log("☕ SIMULADOR DE CAFETERIA INTERATIVO");
    console.log("=================================");
    console.log(`💰 Caixa atual: R$ ${caixaDinheiro.toFixed(2)}`);
    console.log(`📦 Estoque: Café: ${estoque.cafeGrama}g | Leite: ${estoque.leiteMl}ml | Copos: ${estoque.copos}`);
    console.log("---------------------------------");
    console.log("1. Registrar Novo Pedido");
    console.log("2. Reabastecer Estoque (Gasta R$ 15)");
    console.log("3. Limpar Balcão / Resetar Caixa");
    console.log("4. Fechar Cafeteria (Sair)");
    console.log("=================================");
    
    rl.question("Escolha uma opção (1-4): ", processarOpcao);
}

function processarOpcao(opcao) {
    switch (opcao.trim()) {
        case '1':
            fazerPedido();
            break;
        case '2':
            reabastecerEstoque();
            break;
        case '3':
            resetarCaixa();
            break;
        case '4':
            console.log(`\n🚪 Cafeteria fechada! Você encerrou o dia com R$ ${caixaDinheiro.toFixed(2)} no caixa.`);
            rl.close();
            process.exit(0);
        default:
            console.log("\n❌ Opção inválida! Escolha um número de 1 a 4.");
            exibirMenu();
    }
}

// 1. FAZER PEDIDO (Valida estoque e soma faturamento)
function fazerPedido() {
    console.log("\n--- CARDÁPIO ---");
    console.log("1. Espresso  - R$ 6,00");
    console.log("2. Macchiato - R$ 8,50");
    console.log("3. Café Latte - R$ 11,00");
    
    rl.question("\nEscolha o número da bebida: ", (escolha) => {
        const item = cardapio[escolha.trim()];

        if (!item) {
            console.log("❌ Bebida não encontrada no cardápio!");
            exibirMenu();
            return;
        }

        // Validação de regras de negócio (estoque insuficiente)
        if (estoque.cafeGrama < item.cafe) {
            console.log("❌ Falha: Pó de café insuficiente!");
            exibirMenu();
            return;
        }
        if (estoque.leiteMl < item.leite) {
            console.log("❌ Falha: Leite insuficiente!");
            exibirMenu();
            return;
        }
        if (estoque.copos < 1) {
            console.log("❌ Falha: Acabaram os copos descartáveis!");
            exibirMenu();
            return;
        }

        // Consome os ingredientes do estoque
        estoque.cafeGrama -= item.cafe;
        estoque.leiteMl -= item.leite;
        estoque.copos -= 1;
        
        // Adiciona o valor ao caixa
        caixaDinheiro += item.preco;

        console.log(`\n☕ Preparando seu ${item.nome}...`);
        console.log(`✅ Pedido entregue! +R$ ${item.preco.toFixed(2)} adicionados ao caixa.`);
        exibirMenu();
    });
}

// 2. REABASTECER ESTOQUE (Simula custo operacional de compra de insumos)
function reabastecerEstoque() {
    console.log("\n--- REABASTECENDO INSUMOS ---");
    
    if (caixaDinheiro < 15.00) {
        console.log("❌ Dinheiro em caixa insuficiente para comprar suprimentos! (Custo: R$ 15,00)");
        exibirMenu();
        return;
    }

    caixaDinheiro -= 15.00;
    estoque.cafeGrama += 250;
    estoque.leiteMl += 500;
    estoque.copos += 10;

    console.log("✅ Estoque abastecido com sucesso! Extraímos R$ 15,00 do seu lucro.");
    exibirMenu();
}

// 3. RESETAR CAIXA (Simula remoção física do dinheiro do dia anterior)
function resetarCaixa() {
    caixaDinheiro = 0.00;
    console.log("\n💸 O dinheiro do caixa foi recolhido e transferido para o banco. Saldo zerado na gaveta!");
    exibirMenu();
}

// Inicia o loop do simulador pela primeira vez
exibirMenu();
