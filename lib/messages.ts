// Portuguese messages and feedback for Halloween code game

export const MESSAGES = {
  ERROR: {
    text: "SEU TEMPO ESTÁ ACABANDO, VOCÊ SERÁ O PRÓXIMO",
    type: 'error' as const,
    duration: 5000
  },
  SUCCESS: {
    text: "Excelente, detetives. Mas ainda há sombras a serem desmistificadas. Procurem o quadro do investigador — aquele que observa todos os rostos, mas nunca mostra o seu.",
    type: 'success' as const,
    duration: 8000
  },
  NAVIGATION: {
    HOME: "Início",
    CODE_PAGE: "Descobrir Código",
    VALIDATION_PAGE: "Validar Código",
    BACK: "Voltar",
    CONTINUE: "Continuar",
    SKIP_TO_MAIN: "Pular para o conteúdo principal"
  },
  ACCESSIBILITY: {
    CODE_DISPLAY: "Código secreto para o jogo de Halloween",
    INPUT_FIELD: "Campo para inserir o código descoberto",
    SUBMIT_BUTTON: "Validar código inserido",
    ERROR_MESSAGE: "Mensagem de erro da validação",
    SUCCESS_MESSAGE: "Mensagem de sucesso da validação",
    HALLOWEEN_DECORATION: "Decoração temática de Halloween",
    SKIP_TO_MAIN: "Link para pular para o conteúdo principal",
    MAIN_CONTENT: "Conteúdo principal da aplicação",
    FOOTER: "Rodapé com informações do Halloween Party"
  },
  PLACEHOLDERS: {
    CODE_INPUT: "Digite o código aqui...",
    SEARCH: "Procurar..."
  },
  BUTTONS: {
    VALIDATE: "Validar",
    RESET: "Limpar",
    TRY_AGAIN: "Tentar Novamente",
    START_GAME: "Iniciar Jogo"
  },
  HALLOWEEN_FLAVOR: {
    WELCOME: "Bem-vindos ao mistério sombrio...",
    CODE_HINT: "O código está oculto nas sombras",
    VALIDATION_PROMPT: "Prove que são dignos detetives",
    LOADING: "Invocando as trevas...",
    ERROR_GENERIC: "Algo sinistro aconteceu..."
  }
} as const;

export type FeedbackMessage = {
  text: string;
  type: 'success' | 'error';
  duration: number;
};

export type MessageKey = keyof typeof MESSAGES;