import { Component } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ErrorBoundary — Componente di sicurezza globale per l'app React.
 *
 * PERCHÉ ESISTE:
 * In React, se un componente figlio lancia un'eccezione durante il rendering,
 * l'intera albero dei componenti viene smontato e l'utente vede una schermata bianca.
 * ErrorBoundary intercetta questi errori e mostra invece un'interfaccia di recupero,
 * evitando che un bug in un singolo componente blocchi tutta l'app.
 *
 * PERCHÉ È UNA CLASS COMPONENT:
 * I lifecycle methods `getDerivedStateFromError` e `componentDidCatch` sono disponibili
 * solo nelle class component. Non esistono hooks equivalenti in React (al momento).
 * Questo è l'unico pattern supportato da React per intercettare errori di rendering.
 *
 * COSA NON INTERCETTA:
 * - Errori in event handler (es. onClick) — usare try/catch nel handler
 * - Errori in codice asincrono (es. setTimeout, fetch) — gestiti dai singoli componenti
 * - Errori nel server-side rendering
 * - Errori dentro lo stesso ErrorBoundary
 *
 * USO:
 * Wrappare il contenuto dell'app in App.jsx:
 *   <ErrorBoundary>
 *     <BrowserRouter>...</BrowserRouter>
 *   </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    /**
     * hasError: true quando è stato intercettato un errore.
     * Controlla quale UI renderizzare (normale vs fallback).
     */
    this.state = { hasError: false };

    // Binding necessario per accedere a `this` nel metodo handleReset
    this.handleReset = this.handleReset.bind(this);
  }

  /**
   * getDerivedStateFromError — primo hook dell'error boundary lifecycle.
   *
   * Viene chiamato durante la fase di rendering, dopo che un figlio ha lanciato
   * un errore. Riceve l'errore come argomento e deve restituire un aggiornamento
   * di stato. Qui impostiamo `hasError: true` per attivare il fallback UI.
   *
   * È uno static method perché non deve avere effetti collaterali: aggiorna solo
   * lo stato, non esegue logging o side-effects (quelli vanno in componentDidCatch).
   *
   * @param {Error} error - L'errore lanciato dal componente figlio
   * @returns {object} Aggiornamento di stato parziale
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * componentDidCatch — secondo hook dell'error boundary lifecycle.
   *
   * Viene chiamato dopo che il DOM è stato aggiornato con il fallback UI.
   * È il posto giusto per loggare l'errore verso un servizio esterno
   * (es. Sentry, Datadog) perché qui si possono fare side-effects.
   *
   * `errorInfo.componentStack` contiene lo stack trace dei componenti React,
   * utile per identificare esattamente quale componente ha causato l'errore.
   *
   * @param {Error} error - L'errore intercettato
   * @param {React.ErrorInfo} errorInfo - Oggetto con componentStack
   */
  componentDidCatch(error, errorInfo) {
    // In futuro: inviare a un servizio di monitoring (es. Sentry.captureException)
    // Per ora logghiamo solo in console (questo è un errore reale, non debug)
    console.error("[ErrorBoundary] Errore intercettato:", error, errorInfo.componentStack);
  }

  /**
   * handleReset — tenta di recuperare dall'errore resettando lo stato.
   *
   * Riportando `hasError` a false, React ri-renderizza i componenti figli.
   * Se la causa dell'errore è transitoria (es. race condition, stato corrotto),
   * il retry può riportare l'app a uno stato funzionante.
   * Se l'errore persiste, il boundary verrà attivato di nuovo immediatamente.
   */
  handleReset() {
    this.setState({ hasError: false });
  }

  render() {
    // Quando non ci sono errori, renderizza normalmente i componenti figli
    if (!this.state.hasError) {
      return this.props.children;
    }

    // Fallback UI: mostrata al posto dell'albero di componenti che ha crashato
    return (
      <div className="flex min-h-screen items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md text-center space-y-6">

          {/* Icona di errore */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>

          {/* Messaggio principale */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Qualcosa è andato storto
            </h1>
            <p className="text-muted-foreground">
              Si è verificato un errore imprevisto. Puoi riprovare oppure tornare
              alla dashboard.
            </p>
          </div>

          {/* Azioni di recupero */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/*
             * "Riprova" resetta lo stato del boundary: se l'errore era transitorio
             * l'app torna a funzionare normalmente. Se persiste, il boundary
             * verrà riattivato e l'utente vedrà di nuovo questa schermata.
             */}
            <Button onClick={this.handleReset}>
              Riprova
            </Button>

            {/*
             * "Torna alla dashboard" usa un href nativo invece di <Link> perché
             * questo componente potrebbe essere renderizzato fuori dal BrowserRouter
             * in alcuni scenari, e un href forza un reload completo della pagina,
             * che pulisce qualsiasi stato corrotto in memoria.
             */}
            <Button variant="outline" asChild>
              <a href="/dashboard">Torna alla dashboard</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export { ErrorBoundary };
