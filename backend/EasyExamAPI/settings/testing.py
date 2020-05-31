from .development import *
import tempfile

# Replace media root file for temporary one on testing
MEDIA_ROOT = tempfile.TemporaryDirectory(prefix="mediatest").name
