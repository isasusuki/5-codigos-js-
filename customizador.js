import readline from 'readline';

// Configura a interface de leitura e escrita do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Banco de dados simulado (Apenas uma variável local)
let inventario = [
    { id: 1, nome: "Espada de Ferro", tipo: "Arma", raridade: "Comum", ataque: 15 },
    { id: 2, nome: "Poção de Vida", tipo: "Consumível", raridade: "Comum", cura: 50 }
];

// Função auxiliar para exibir o menu principal
function exibirMenu() {
    console.log("\n=================================");
    console.log("🎒 SIMULADOR DE INVENTÁRIO RPG   ");
    console.log("=================================");
    console.log("1. Ver itens do inventário");
    console.log("2. Adicionar novo item");
    console.log("3. Equipar/Melhorar um item (Upgrade)");
    console.log("4. Descartar um item");
    console.log("5. Sair do simulador");
    console.log("=================================");
    
    rl.question("Escolha uma opção (1-5): ", processarOpcao);
}

// Processa a escolha do usuário
function processarOpcao(opcao) {
    switch (opcao.trim()) {
        case '1':
            listarItens();
            break;
        case '2':
            adicionarItem();
            break;
        case '3':
            melhorarItem();
            break;
        case '4':
            descartarItem();
            break;
        case '5':
            console.log("\n👋 Fechando a mochila do aventureiro. Até mais!");
            rl.close();
            process.exit(0);
        default:
            console.log("\n❌ Opção inválida! Escolha um número de 1 a 5.");
            exibirMenu();
    }
}

// 1. LISTAR ITENS
function listarItens() {
    console.log("\n--- SEUS ITENS ---");
    if (inventario.length === 0) {
        console.log("Sua mochila está completamente vazia.");
    } else {
        inventario.forEach(item => {
            let detalhes = `[ID: ${item.id}] ${item.nome} (${item.tipo}) - Raridade: ${item.raridade}`;
            if (item.ataque) detalhes += ` | Ataque: ${item.ataque}`;
            if (item.cura) detalhes += ` | Cura: ${item.cura}`;
            console.log(detalhes);
        });
    }
    exibirMenu();
}

// 2. ADICIONAR ITEM
function adicionarItem() {
    console.log("\n--- ADICIONAR NOVO ITEM ---");
    rl.question("Nome do item: ", (nome) => {
        rl.question("Tipo (Arma/Armadura/Consumível): ", (tipo) => {
            rl.question("Poder base (Número): ", (poder) => {
                
                const novoId = inventario.length > 0 ? inventario[inventario.length - 1].id + 1 : 1;
                const novoItem = {
                    id: novoId,
                    nome: nome,
                    tipo: tipo,
                    raridade: "Comum",
                    ataque: parseInt(poder) || 10
                };

                inventario.push(novoItem);
                console.log(`\n✅ [${nome}] foi adicionado à sua mochila!`);
                exibirMenu();
            });
        });
    });
}

// 3. FAZER UPGRADE (PATCH/PUT SIMULADO)
function melhorarItem() {
    console.log("\n--- MELHORAR ITEM (UPGRADE) ---");
    rl.question("Digite o ID do item que deseja dar upgrade: ", (idStr) => {
        const id = parseInt(idStr);
        const item = inventario.find(i => i.id === id);

        if (!item) {
            console.log("❌ Item não encontrado no inventário!");
            exibirMenu();
            return;
        }

        if (item.raridade === "Comum") {
            item.raridade = "Raro";
            if (item.ataque) item.ataque += 20;
            console.log(`\n✨ Sucesso! Seu [${item.nome}] agora é RARO e ganhou +20 de ataque!`);
        } else if (item.raridade === "Raro") {
            item.raridade = "Lendário";
            if (item.ataque) item.ataque += 50;
            console.log(`\n🔥 INCRÍVEL! Seu [${item.nome}] agora é LENDÁRIO e ganhou +50 de ataque!`);
        } else {
            console.log(`\n⚡ O item [${item.nome}] já está no nível máximo!`);
        }

        exibirMenu();
    });
}

// 4. DELETAR ITEM
function descartarItem() {
    console.log("\n--- DESCARTAR ITEM ---");
    rl.question("Digite o ID do item que deseja jogar fora: ", (idStr) => {
        const id = parseInt(idStr);
        const indice = inventario.findIndex(i => i.id === id);

        if (indice === -1) {
            console.log("❌ Item não encontrado.");
        } else {
            const removido = inventario.splice(indice, 1);
            console.log(`\n🗑️ Você destruiu o item: ${removido[0].nome}.`);
        }
        exibirMenu();
    });
}

// Inicia o simulador exibindo o menu pela primeira vez
exibirMenu();
