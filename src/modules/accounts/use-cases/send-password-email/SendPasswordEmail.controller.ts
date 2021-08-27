import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendPasswordEmail from './SendPasswordEmail.service';

class SendPasswordEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendPasswordEmail = container.resolve(SendPasswordEmail);

    await sendPasswordEmail.execute(email);

    return response.json();
  }
}

export default SendPasswordEmailController;
