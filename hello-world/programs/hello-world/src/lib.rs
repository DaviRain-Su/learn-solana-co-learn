use anchor_lang::prelude::*;

declare_id!("22sSSi7GtQgwXFcjJmGNNKSCLEsiJxyYLFfP3CMWeMLj");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, data: String) -> Result<()> {
        msg!("{}", data);

        *ctx.accounts.hello_world = HelloWorld {
            authority: *ctx.accounts.authority.key,
            data,
        };

        Ok(())
    }

    pub fn update(ctx: Context<UpdateHelloWorld>, data: String) -> Result<()> {
        ctx.accounts.hello_world.data = data;
        msg!("{}", ctx.accounts.hello_world.data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + HelloWorld::INIT_SPACE,
        seeds = [b"hello-world"],
        bump
    )]
    pub hello_world: Account<'info, HelloWorld>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateHelloWorld<'info> {
    #[account(
            mut,
            seeds = [b"hello-world"],
            bump
    )]
    pub hello_world: Account<'info, HelloWorld>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct HelloWorld {
    pub authority: Pubkey,
    #[max_len(100)]
    pub data: String,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("Cannot get the bump.")]
    CannotGetBump,
}
