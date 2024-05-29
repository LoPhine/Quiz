const readline = require('readline');

// Configuração da interface de leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntarNome() {
  return new Promise((resolve) => {
    rl.question('Qual é o seu nome? ', (nome) => {
      resolve(nome);
    });
  });
}

function selecionarTema() {
  return new Promise((resolve) => {
    rl.question('Escolha o tema do quiz: 1. Yoga, 2. Astrologia, 3. Tecnologia ', (tema) => {
      resolve(parseInt(tema));
    });
  });
}

function fazerPerguntas(perguntas) {
  let pontos = 0;
  let index = 0;

  return new Promise((resolve) => {
    const fazerPergunta = () => {
      if (index < perguntas.length) {
        rl.question(perguntas[index].pergunta + ' (v para Verdadeiro ou f para Falso) ', (resposta) => {
          if (resposta.toLowerCase() === perguntas[index].resposta.toLowerCase()) {
            pontos++;
          }
          index++;
          fazerPergunta();
        });
      } else {
        resolve(pontos);
      }
    };
    fazerPergunta();
  });
}

const perguntasYoga = [
  { pergunta: "A postura do cachorro olhando para baixo é uma postura de equilíbrio.", resposta: "f" },
  { pergunta: "Existem 7 chakras principais no corpo humano.", resposta: "v" },
  { pergunta: "Pranayama é a prática de respiração em Yoga.", resposta: "v" },
  { pergunta: "A palavra 'Yoga' significa 'força'.", resposta: "f" },
  { pergunta: "Virabhadrasana é a postura do guerreiro.", resposta: "v" },
  { pergunta: "Hatha Yoga é o tipo de yoga mais popular no Ocidente.", resposta: "v" },
  { pergunta: "Patanjali é conhecido como o pai da Yoga moderna.", resposta: "v" },
  { pergunta: "Jala Neti é um exercício de limpeza nasal em Yoga.", resposta: "v" },
  { pergunta: "Savasana é a postura de relaxamento final em uma aula de Yoga.", resposta: "v" },
  { pergunta: "Surya Namaskar é a saudação ao sol em sânscrito.", resposta: "v" }
];

const perguntasAstrologia = [
  { pergunta: "Existem 10 signos do zodíaco.", resposta: "f" },
  { pergunta: "Capricórnio é o signo do zodíaco de alguém nascido em 1º de janeiro.", resposta: "v" },
  { pergunta: "Marte é conhecido como o planeta da guerra.", resposta: "v" },
  { pergunta: "O elemento do signo de Leão é Terra.", resposta: "f" },
  { pergunta: "O signo oposto de Escorpião é Touro.", resposta: "v" },
  { pergunta: "Sagitário é representado por um arqueiro.", resposta: "v" },
  { pergunta: "Netuno é o planeta regente de Peixes.", resposta: "v" },
  { pergunta: "Gêmeos é conhecido por sua dualidade.", resposta: "v" },
  { pergunta: "O símbolo do signo de Virgem é a balança.", resposta: "f" },
  { pergunta: "Gêmeos é o signo mais compatível com Libra.", resposta: "v" }
];

const perguntasTecnologia = [
  { pergunta: "Bill Gates é o fundador da Microsoft.", resposta: "v" },
  { pergunta: "JavaScript é conhecida como a linguagem da web.", resposta: "v" },
  { pergunta: "HTML significa HyperText Markup Language.", resposta: "v" },
  { pergunta: "A Apple criou o iPhone.", resposta: "v" },
  { pergunta: "Windows é o sistema operacional mais usado no mundo.", resposta: "v" },
  { pergunta: "Alexa é o assistente virtual da Amazon.", resposta: "v" },
  { pergunta: "Minerador ASIC é usado para minerar criptomoedas.", resposta: "v" },
  { pergunta: "FTP é o protocolo usado para transferir arquivos na internet.", resposta: "v" },
  { pergunta: "Elon Musk é o CEO da Tesla.", resposta: "v" },
  { pergunta: "Internet das Coisas é o termo usado para descrever a rede de dispositivos conectados à internet.", resposta: "v" }
];

async function iniciarQuiz() {
  let nome = await perguntarNome();
  let tema = await selecionarTema();
  let pontos = 0;

  if (tema === 1) {
    pontos = await fazerPerguntas(perguntasYoga);
  } else if (tema === 2) {
    pontos = await fazerPerguntas(perguntasAstrologia);
  } else if (tema === 3) {
    pontos = await fazerPerguntas(perguntasTecnologia);
  } else {
    console.log("Tema inválido. Por favor, reinicie o quiz e tente novamente.");
    rl.close();
    return;
  }

  console.log(`${nome}, você fez ${pontos} pontos!`);
  rl.close();
}

iniciarQuiz();
