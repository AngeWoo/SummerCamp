import sys

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

def recover(text):
    try:
        # Get-Content (Default encoding on TW windows is big5 / cp950)
        # It read UTF-8 file bytes by decoding them as BIG5.
        # Then Out-File -Encoding utf8 wrote those garbled python unicode strings as UTF-8 bytes.
        # So text contains the garbled python unicode string.
        # To reverse: encode as cp950, then decode as utf-8.
        return text.encode('cp950').decode('utf-8')
    except Exception as e:
        return f"Error: {e}"

recovered = recover(text)
if "Error" not in recovered and "佛" in recovered:
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(recovered)
    print("SUCCESS: Recovered index.html")
else:
    print("FAILED:", recovered[:100])
