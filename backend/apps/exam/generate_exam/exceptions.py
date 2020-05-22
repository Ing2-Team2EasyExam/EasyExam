class CompilationErrorException(Exception):
    def __init__(self, latex_logs):
        super().__init__()
        self.latex_logs = latex_logs
