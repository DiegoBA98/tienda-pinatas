import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import AvisoNoLogin from '../avisoNoLogin';

type ModalContainerProps = {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isModalVisible: boolean
    nameModal: string;
}

export default function ModalContainer({isModalVisible, setIsModalVisible, nameModal}: ModalContainerProps) {

    const componentsMap = {
        "NoLogin": AvisoNoLogin,
    };

    const noLogin = nameModal;

    const getComponentName = () => {
        if (noLogin) return "NoLogin";
    };

    const componentName = getComponentName();
    const componentToRender = componentName ? componentsMap[componentName] : null;

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            {/* <Transition appear show={isModalVisible} as={Fragment}>
                <Dialog className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0  bg-black/70" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white/95 text-left align-middle shadow-xl transition-all py-6 relative">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-5 right-6 rounded-full bg-gray-200 hover:bg-gray-300 transition cursor-pointer p-1 flex justify-center items-center"
                                    >
                                        <X/>
                                    </button>

                                    {componentToRender ? React.createElement(componentToRender, { closeModal }) : null}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
            <Dialog open={isModalVisible} onOpenChange={closeModal}>
                <DialogContent aria-describedby='Iniciar Sesión'
                >
                    <DialogTitle>{' '}</DialogTitle>
                    <DialogDescription asChild >
                        <div>
                            {componentToRender ? React.createElement(componentToRender, { closeModal }) : null}
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}
