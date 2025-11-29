"""
Service: forgot password (Supabase)
"""

from opty_api.app import container


async def send_reset_password_email(email: str) -> None:
    """
    Dispara o e-mail de redefinição de senha do Supabase.

    O link do e-mail vai redirecionar para o front em /reset-password.
    """

    supabase = container["supabase_client"]

    # URL do front local
    redirect_url = "http://localhost:5000/reset-password"

    # Supabase Python usa reset_password_for_email
    response = await supabase.auth.reset_password_for_email(
        email,
        {
            "redirect_to": redirect_url,
        },
    )

    # Se quiser, pode logar algum erro:
    if response is not None and getattr(response, "error", None):
        # só loga, não joga erro pra fora
        print("[send_reset_password_email] error:", response.error)
